import HttpError from '@/classes/HttpError';
import dbConnect from '@/lib/dbconnect';
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

    const requestMethod = req.method;
    switch (requestMethod) {
      case 'GET':
        const { id } = req.query;
        if (!mongoose.isValidObjectId(id)) {
          throw new HttpError(400, 'ERR_INVALID_PARAMS');
        }
        const user = await User.findById(id);
        if (!user) {
          throw new HttpError(400, 'ERR_USER_NOT_FOUND');
        }
        return res.status(200).json(user);
      default:
        return res.status(405).send('Only GET method allowed!');
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.code).send(err.message);
    }
    res.status(500).send('ERR_UNKNOWN');
  }
}
