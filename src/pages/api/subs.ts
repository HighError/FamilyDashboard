import HttpError from '@/classes/HttpError';
import dbConnect from '@/lib/dbconnect';
import Subscription, { ISubscription } from '@/model/Subscription';
import { verifyAdmin } from '@/utils/verifyUser';
import axios from 'axios';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    await verifyAdmin(req);

    const requestMethod = req.method;
    const { id, title, icon, cost, date, data } = req.body;
    switch (requestMethod) {
      case 'GET':
        const subs = await Subscription.find({});
        return res.status(200).json(subs);
      case 'POST':
        if (!title || !icon || !cost || !date) {
          throw new HttpError(400, 'ERR_MISSING_PARAMS');
        }

        const newSub: ISubscription = new Subscription({
          title,
          icon,
          cost,
          date,
        });

        await newSub.save();
        return res.status(200).json('OK');
      case 'PUT':
        if (!id || !data) {
          throw new HttpError(400, 'ERR_MISSING_PARAMS');
        }

        if (!mongoose.isValidObjectId(id)) {
          throw new HttpError(400, 'ERR_INVALID_SUB_ID');
        }

        const editSub = data as ISubscription;
        if (!editSub) {
          throw new HttpError(400, 'ERR_INVALID_PARAMS');
        }

        await Subscription.findByIdAndUpdate(id, editSub);
        return res.status(200).json('OK');
      case 'DELETE':
        if (!id) {
          throw new HttpError(400, 'ERR_MISSING_PARAMS');
        }

        if (!mongoose.isValidObjectId(id)) {
          throw new HttpError(400, 'ERR_INVALID_SUB_ID');
        }

        await Subscription.findByIdAndRemove(id);
        return res.status(200).json('OK');
      default:
        return res.status(405).json('Only GET/POST/PUT/DELETE method allowed!');
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
