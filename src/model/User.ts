import { model, Schema, Document, models } from 'mongoose';
import { ITransaction } from './Transaction';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  balance: number;
  subscriptions: [];
  transactions: ITransaction[];
  role: 'default' | 'admin' | 'unknown';
  paymentLink: string;
  telegram: string;
  tokens: string[];
}

export const userSchema: Schema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
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
  tokens: [String],
});

const User = models.User || model<IUser>('User', userSchema);
export default User;
