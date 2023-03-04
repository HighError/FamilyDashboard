import { model, Schema, Document, models, ObjectId } from 'mongoose';
import { ISubscription } from './Subscription';
import { ITransaction } from './Transaction';

export interface IUser extends Document {
  _id: ObjectId;
  balance: number;
  subscriptions: ISubscription[];
  transactions: ITransaction[];
  role: 'default' | 'admin' | 'unknown';
  paymentLink: string;
  telegram: string;
}

export const userSchema: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  subscriptions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subscription',
    },
  ],
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
  role: {
    type: String,
    required: true,
    default: 'default',
  },
  paymentLink: {
    type: String,
    default: '',
  },
  telegram: {
    type: String,
    default: '',
  },
});

const User = models.User || model<IUser>('User', userSchema);
export default User;
