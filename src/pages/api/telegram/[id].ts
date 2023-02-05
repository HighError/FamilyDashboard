import HttpError from '@/classes/HttpError';
import dbConnect from '@/lib/dbconnect';
import User from '@/model/User';
import { verifyTelegramAuth } from '@/utils/verifyUser';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    if (!(await verifyTelegramAuth(req))) {
      throw new HttpError(403, 'ERR_INVALID_API_KEY');
    }

    const requestMethod = req.method;
    switch (requestMethod) {
      case 'GET':
        const { id } = req.query;
        if (!id) {
          throw new HttpError(400, 'ERR_MISSING_PARAMS');
        }

        const user = await User.findOne({ telegram: id })
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
    res.status(500).json('ERR_UNKNOWN');
  }
}
