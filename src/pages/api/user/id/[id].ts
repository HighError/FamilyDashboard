import HttpError from '@/classes/HttpError';
import dbConnect from '@/lib/dbconnect';
import User from '@/model/User';
import { verifyAdmin } from '@/utils/verifyUser';
import axios from 'axios';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    await verifyAdmin(req);

    const requestMethod = req.method;
    switch (requestMethod) {
      case 'GET':
        const { id } = req.query;
        if (!mongoose.isValidObjectId(id)) {
          throw new HttpError(400, 'ERR_INVALID_PARAMS');
        }
        const user = await User.findById(id)
          .populate('subscriptions')
          .populate('transactions');
        if (!user) {
          throw new HttpError(400, 'ERR_USER_NOT_FOUND');
        }
        return res.status(200).json(user);
      default:
        return res.status(405).json('Only GET method allowed!');
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.code).json(err.message);
    }

    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        return res.status(401).send('ERR_NEED_AUTHORIZATION');
      }
    }

    res.status(500).json('ERR_UNKNOWN');
  }
}
