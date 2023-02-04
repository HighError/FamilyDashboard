import { IconType } from '@/types/Icon';
import { model, Schema, Document, models } from 'mongoose';

export interface ISubscription extends Document {
  title: string;
  icon: IconType;
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

const Subscription =
  models.Subscription ||
  model<ISubscription>('Subscription', subscriptionSchema);
export default Subscription;
