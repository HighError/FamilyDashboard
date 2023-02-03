import HttpError from '@/classes/HttpError';
import verifyUser from '@/utils/verifyUser';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = await verifyUser(req, res);

    const requestMethod = req.method;
    switch (requestMethod) {
      case 'GET':
        return res.status(200).json({ id });
      default:
        return res.status(405).send('Only GET method allowed!');
    }
  } catch (e) {
    if (e instanceof HttpError) {
      return res.status(e.code).send(e.message);
    }
    res.status(500).send('ERR_UNKNOWN');
  }
}
