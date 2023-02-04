import HttpError from '@/classes/HttpError';
import User, { IUser } from '@/model/User';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { UserAuthData } from '@/types/UserAuthData';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export async function verifyAdmin(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<string> {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new HttpError(401, 'ERR_NEED_AUTHORIZATION');
  }

  const { id, token } = session.user as UserAuthData;
  if (!id || !token) {
    throw new HttpError(401, 'ERR_NEED_AUTHORIZATION');
  }

  const user: IUser | null = await User.findById(id);
  if (!user) {
    throw new HttpError(401, 'ERR_NEED_AUTHORIZATION');
  }

  if (!user.tokens.includes(token)) {
    throw new HttpError(401, 'ERR_NEED_AUTHORIZATION');
  }

  if (user.role !== 'admin') {
    throw new HttpError(403, 'ERR_NEED_ADMIN_AUTHORIZATION');
  }

  return id;
}

export default async function verifyUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<string> {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new HttpError(401, 'ERR_NEED_AUTHORIZATION');
  }

  const { id, token } = session.user as UserAuthData;
  if (!id || !token) {
    throw new HttpError(401, 'ERR_NEED_AUTHORIZATION');
  }

  const user: IUser | null = await User.findById(id);
  if (!user) {
    throw new HttpError(401, 'ERR_NEED_AUTHORIZATION');
  }

  if (!user.tokens.includes(token)) {
    throw new HttpError(401, 'ERR_NEED_AUTHORIZATION');
  }

  return id;
}
