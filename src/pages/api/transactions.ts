import HttpError from '@/classes/HttpError';
import dbConnect from '@/lib/dbconnect';
import Transaction, { ITransaction } from '@/model/Transaction';
import User, { IUser } from '@/model/User';
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
    const { userID, data, changeBalance, transactionID } = req.body;
    const user: IUser | null = await User.findById(userID);
    if (!user) {
      throw new HttpError(400, 'ERR_USER_NOT_FOUND');
    }

    switch (requestMethod) {
      case 'POST':
        if (!userID || !data) {
          throw new HttpError(400, 'ERR_MISSING_PARAMS');
        }

        if (!mongoose.isValidObjectId(userID)) {
          throw new HttpError(400, 'ERR_INVALID_PARAMS');
        }

        const newTransaction: ITransaction = new Transaction({
          ...data,
        });

        await newTransaction.save();

        if (changeBalance === true) {
          user.balance += newTransaction.suma;
        }

        user.transactions.push(newTransaction);

        await user.save();

        return res.status(200).json('OK');
      case 'DELETE':
        if (!userID || !transactionID) {
          throw new HttpError(400, 'ERR_MISSING_PARAMS');
        }

        if (
          !mongoose.isValidObjectId(userID) ||
          !mongoose.isValidObjectId(transactionID)
        ) {
          throw new HttpError(400, 'ERR_INVALID_PARAMS');
        }

        const transaction: ITransaction | null =
          await Transaction.findByIdAndRemove(transactionID);
        if (!transaction) {
          throw new HttpError(400, 'ERR_TRANSACTION_NOT_FOUND');
        }

        await user.save();
        return res.status(200).json('OK');
      default:
        return res.status(405).json('Only POST/DELETE method allowed!');
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
