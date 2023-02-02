import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  username: string;
  email: string;
  balance: number;
  subscriptions: [unknown];
  transactions: [unknown];
  role: "default" | "admin";
  paymentLink?: string;
  telegram?: string;
}
