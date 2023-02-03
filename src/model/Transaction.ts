import { model, Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  title: string;
  suma: number;
  date: Date;
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

const Transaction = model<ITransaction>('Transaction', transactionSchema);
export default Transaction;
