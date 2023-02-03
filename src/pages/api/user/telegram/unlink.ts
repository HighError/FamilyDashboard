import HttpError from '@/classes/HttpError';
import dbConnect from '@/lib/dbconnect';
import User from '@/model/User';
import verifyUser from '@/utils/verifyUser';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const id = await verifyUser(req, res);

    const requestMethod = req.method;
    switch (requestMethod) {
      case 'POST':
        const user = await User.findById(id);
        if (!user) {
          throw new HttpError(400, 'ERR_USER_NOT_FOUND');
        }

        if (!user.telegram) {
          throw new HttpError(400, 'ERR_TELEGRAM_ALREADY_UNLINKED');
        }

        user.telegram = '';

        await user.save();
        return res.status(200).send('OK!');
      default:
        return res.status(405).send('Only POST method allowed!');
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.code).send(err.message);
    }
    res.status(500).send('ERR_UNKNOWN');
  }
}
