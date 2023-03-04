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
        const users = await User.find({}).lean();
        const extendedUsers = await Promise.all(
          users.map(async (e) => {
            const user = { ...e };
            try {
              const { data } = await axios.get(
                `${
                  process.env.NEXT_PUBLIC_ID_URL ?? ''
                }/api/user/${user._id.toString()}`,
                {
                  headers: {
                    Authorization: `${process.env.API_KEY_ID}`,
                  },
                }
              );
              user.username = data.username;
              user.email = data.email;
              user.id = user._id.toString();
            } catch (err) {
              user.username = '??';
              user.email = '??';
              user.id = user._id.toString();
            }
            return user;
          })
        );
        return res.status(200).json(extendedUsers);
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
