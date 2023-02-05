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

        const updateUser = await User.findById(userID);
        if (!updateUser) {
          throw new HttpError(400, 'ERR_USER_NOT_FOUND');
        }

        const sub = await Subscription.findById(subID);
        if (!sub) {
          throw new HttpError(400, 'ERR_SUB_NOT_FOUND');
        }

        updateUser.subscriptions.push(sub);

        await updateUser.save();
        return res.status(200).json('OK');
      case 'DELETE':
        if (!userID || !subID) {
          throw new HttpError(400, 'ERR_MISSING_PARAMS');
        }

        if (
          !mongoose.isValidObjectId(userID) ||
          !mongoose.isValidObjectId(subID)
        ) {
          throw new HttpError(400, 'ERR_INVALID_PARAMS');
        }

        const removeSubUser = await User.findById(userID);
        if (!removeSubUser) {
          throw new HttpError(400, 'ERR_USER_NOT_FOUND');
        }

        for (let i = 0; i < removeSubUser.subscriptions.length; i += 1) {
          if (removeSubUser.subscriptions[i].toString() === subID) {
            removeSubUser.subscriptions.splice(i, 1);
            break;
          }
        }
        await removeSubUser.save();
        return res.status(200).json('OK');
      default:
        return res.status(405).json('Only PUT/DELETE method allowed!');
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.code).json(err.message);
    }
    res.status(500).json('ERR_UNKNOWN');
  }
}
