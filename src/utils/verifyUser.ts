import HttpError from '@/classes/HttpError';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { UserAuthData } from '@/types/UserAuthData';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

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

  console.log(id);

  return id;
}
