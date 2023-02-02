import { InferSchemaType } from "mongodb";
import User from "@/model/User";

export type User = InferSchemaType<typeof User>;
