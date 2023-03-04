import HttpError from '@/classes/HttpError';
import dbConnect from '@/lib/dbconnect';
import User from '@/model/User';
import verifyUser from '@/utils/verifyUser';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const id = await verifyUser(req);

    const requestMethod = req.method;
    switch (requestMethod) {
      case 'GET':
        const user = await User.findById(id)
          .populate('transactions')
          .populate('subscriptions');

        const userID = await axios.get(
          `${process.env.NEXT_PUBLIC_ID_URL ?? ''}/api/user`,
          {
            withCredentials: true,
            headers: {
              cookie: req.headers.cookie,
            },
          }
        );

        return res.status(200).json({
          user: {
            ...user._doc,
            username: userID.data.user.username,
            email: userID.data.user.email,
          },
        });
      default:
        return res.status(405).json('Only GET method allowed!');
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.code).json(err.message);
    }

    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        return res.status(401).send('ERR_INVALID_LOGIN_OR_PASSWORD');
      }
    }

    res.status(500).json('ERR_UNKNOWN');
  }
}
