import HttpError from '@/classes/HttpError';
import User, { IUser } from '@/model/User';
import axios from 'axios';
import mongoose from 'mongoose';
import { NextApiRequest } from 'next';

export async function verifyTelegramAuth(
  req: NextApiRequest
): Promise<boolean> {
  return req.headers.authorization === `API-KEY ${process.env.TELEGRAM_APIKEY}`;
}

export async function verifyAdmin(req: NextApiRequest): Promise<string> {
  if (!req.headers.cookie) {
    throw new HttpError(401, 'ERR_NEED_AUTHORIZATION');
  }

  const userID = await axios.get(
    `${process.env.NEXT_PUBLIC_ID_URL ?? ''}/api/user`,
    {
      withCredentials: true,
      headers: {
        cookie: req.headers.cookie,
      },
    }
  );

  const user: IUser | null = await User.findById(userID.data.user._id);

  if (!user) {
    throw new HttpError(401, 'ERR_NEED_AUTHORIZATION');
  }

  if (user.role !== 'admin') {
    throw new HttpError(403, 'ERR_NEED_ADMIN_AUTHORIZATION');
  }

  return user.id;
}

export default async function verifyUser(req: NextApiRequest): Promise<string> {
  if (!req.headers.cookie) {
    throw new HttpError(401, 'ERR_NEED_AUTHORIZATION');
  }

  const userID = await axios.get(
    `${process.env.NEXT_PUBLIC_ID_URL ?? ''}/api/user`,
    {
      withCredentials: true,
      headers: {
        cookie: req.headers.cookie,
      },
    }
  );

  const user: IUser | null = await User.findById(userID.data.user._id);

  if (!user) {
    const newUser: IUser = new User({
      _id: new mongoose.Types.ObjectId(userID.data.user._id),
    });
    await newUser.save();
    return newUser.id;
  }

  return user.id;
}
