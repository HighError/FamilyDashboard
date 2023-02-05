import HttpError from '@/classes/HttpError';
import dbConnect from '@/lib/dbconnect';
import User from '@/model/User';
import { verifyAdmin } from '@/utils/verifyUser';
import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    await verifyAdmin(req, res);

    const requestMethod = req.method;
    switch (requestMethod) {
      case 'PUT':
        const { id, balance } = req.body;
        if (!id || typeof balance !== 'number') {
          throw new HttpError(400, 'ERR_MISSING_PARAMS');
        }

        if (!mongoose.isValidObjectId(id)) {
          throw new HttpError(400, 'ERR_INVALID_PARAMS');
        }

        const user = await User.findById(id);
        if (!user) {
          throw new HttpError(400, 'ERR_USER_NOT_FOUND');
        }

        user.balance = balance;

        await user.save();
        return res.status(200).json('OK');
      default:
        return res.status(405).json('Only PUT method allowed!');
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.code).json(err.message);
    }
    res.status(500).json('ERR_UNKNOWN');
  }
}
