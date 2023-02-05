import HttpError from '@/classes/HttpError';
import dbConnect from '@/lib/dbconnect';
import TempoaryKey, { ITemporaryKey } from '@/model/TemporaryKey';
import User, { IUser } from '@/model/User';
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
    const { telegramID, key } = req.body;
    switch (requestMethod) {
      case 'POST':
        if (!telegramID || !key) {
          throw new HttpError(400, 'ERR_MISSING_PARAMS');
        }

        const temporaryKey: ITemporaryKey | null = await TempoaryKey.findOne({
          key,
        });
        if (!temporaryKey) {
          throw new HttpError(400, 'ERR_TEMPORARY_KEY_NOT_FOUND');
        }

        const addUser: IUser | null = await User.findOne(temporaryKey.user);
        if (!addUser) {
          throw new HttpError(400, 'ERR_USER_NOT_FOUND');
        }

        if (addUser.telegram !== '') {
          throw new HttpError(400, 'ERR_TELEGRAM_ALREADY_LINKED');
        }

        addUser.telegram = telegramID;
        await addUser.save();
        return res.status(200).json('OK');
      case 'DELETE':
        if (!telegramID) {
          throw new HttpError(400, 'ERR_MISSING_PARAMS');
        }

        const deleteUser: IUser | null = await User.findOne({
          telegram: telegramID,
        });
        if (!deleteUser) {
          throw new HttpError(400, 'ERR_TELEGRAM_USER_NOT_FOUND');
        }

        deleteUser.telegram = '';
        await deleteUser.save();
        return res.status(200).json('OK');
      default:
        return res.status(405).json('Only POST/DELETE method allowed!');
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.code).json(err.message);
    }
    res.status(500).json('ERR_UNKNOWN');
  }
}
