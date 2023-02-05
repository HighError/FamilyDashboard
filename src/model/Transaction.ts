import { model, Schema, Document, models } from 'mongoose';

export interface ITransaction extends Document {
  title: string;
  suma: number;
  date: string;
}

const transactionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  suma: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    require: true,
  },
});

const Transaction =
  models.Transaction || model<ITransaction>('Transaction', transactionSchema);
export default Transaction;
