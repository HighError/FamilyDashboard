import { model, Schema, Document, ObjectId, models } from 'mongoose';

export interface ITemporaryKey extends Document {
  user: ObjectId;
  key: string;
  date: Date;
}

const temporaryKeySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  key: {
    type: String,
    require: true,
  },
  date: {
    type: Schema.Types.Date,
    require: true,
  },
});

const TempoaryKey =
  models.TemporaryKey ||
  model<ITemporaryKey>('TemporaryKey', temporaryKeySchema);
export default TempoaryKey;
