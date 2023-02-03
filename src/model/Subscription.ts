import { model, Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
  title: string;
  icon: 'default' | 'youtube' | 'spotify';
  cost: number;
  date: Date;
}

const subscriptionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'default',
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Subscription = model<ISubscription>('Transaction', subscriptionSchema);
export default Subscription;
