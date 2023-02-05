import HttpError from '@/classes/HttpError';
import dbConnect from '@/lib/dbconnect';
import User from '@/model/User';
import verifyUser from '@/utils/verifyUser';
import { NextApiRequest, NextApiResponse } from 'next';
import TemporaryKey, { ITemporaryKey } from '@/model/TemporaryKey';
import moment from 'moment';
import unidque from 'unidque';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const id = await verifyUser(req, res);
    const user = await User.findById(id);

    const requestMethod = req.method;
    switch (requestMethod) {
      case 'POST':
        if (!user) {
          throw new HttpError(400, 'ERR_USER_NOT_FOUND');
        }

        if (user.telegram) {
          throw new HttpError(400, 'ERR_TELEGRAM_ALREADY_LINKED');
        }

        const newKey: ITemporaryKey = new TemporaryKey({
          user: user._id,
          key: unidque().toString(),
          date: moment().add(10, 'm'),
        });

        await newKey.save();
        return res.status(200).send(newKey.key);
      case 'DELETE':
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
        return res.status(405).send('Only POST/DELETE method allowed!');
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.code).send(err.message);
    }
    res.status(500).send('ERR_UNKNOWN');
  }
}
