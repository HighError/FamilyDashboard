import HttpError from '@/classes/HttpError';
import dbConnect from '@/lib/dbconnect';
import User from '@/model/User';
import verifyUser from '@/utils/verifyUser';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

interface IProps {
  oldPass?: string;
  newPass?: string;
}

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
        const { oldPass, newPass }: IProps = req.body;
        if (!oldPass || !newPass) {
          throw new HttpError(400, 'ERR_MISSING_PARAMS');
        }

        const user = await User.findById(id).select('+password');
        if (!user) {
          throw new HttpError(400, 'ERR_USER_NOT_FOUND');
        }

        const matchPassword = await bcrypt.compare(
          oldPass,
          user.password ?? ''
        );

        if (!matchPassword) {
          throw new HttpError(400, 'ERR_OLD_PASSWORD_INVALID');
        }

        user.password = await bcrypt.hash(newPass, 10);

        await user.save();
        return res.status(200).json('OK');
      default:
        return res.status(405).json('Only POST method allowed!');
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.code).json(err.message);
    }
    res.status(500).json('ERR_UNKNOWN');
  }
}
