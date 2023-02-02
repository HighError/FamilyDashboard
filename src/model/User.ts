import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
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
      ref: "Subscription",
    },
  ],
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  role: {
    type: String,
    required: true,
    default: "default",
  },
  paymentLink: {
    type: String,
    default: "",
  },
  telegram: {
    type: String,
    default: "",
  },
  tokens: [String],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
