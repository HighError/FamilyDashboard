import HttpError from '@/classes/HttpError';
import dbConnect from '@/lib/dbconnect';
import User from '@/model/User';
import { verifyAdmin } from '@/utils/verifyUser';
import axios from 'axios';
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
        const users = await User.find({});
        return res.status(200).json(users);
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
