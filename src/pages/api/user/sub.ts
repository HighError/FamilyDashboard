import HttpError from '@/classes/HttpError';
import dbConnect from '@/lib/dbconnect';
import Subscription from '@/model/Subscription';
import User from '@/model/User';
import { verifyAdmin } from '@/utils/verifyUser';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    await verifyAdmin(req, res);

    const { userID, subID } = req.body;

    const requestMethod = req.method;
    switch (requestMethod) {
      case 'PUT':
        if (!userID || !subID) {
          throw new HttpError(400, 'ERR_MISSING_PARAMS');
        }

        if (
          !mongoose.isValidObjectId(userID) ||
          !mongoose.isValidObjectId(subID)
        ) {
          throw new HttpError(400, 'ERR_INVALID_PARAMS');
        }

        const user = await User.findById(userID);
        if (!user) {
          throw new HttpError(400, 'ERR_USER_NOT_FOUND');
        }

        const sub = await Subscription.findById(subID);
        if (!sub) {
          throw new HttpError(400, 'ERR_SUB_NOT_FOUND');
        }

        user.subscriptions.push(sub);

        await user.save();
        return res.status(200).send('OK');
      default:
        return res.status(405).send('Only PUT method allowed!');
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.code).send(err.message);
    }
    res.status(500).send('ERR_UNKNOWN');
  }
}