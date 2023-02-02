import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import dbConnect from "@/lib/dbconnect";
import User from "@/model/User";

interface ResponseData {
  error?: string;
  msg?: string;
}

async function validate(email: string, username: string) {
  await dbConnect();
  const emailUser = await User.findOne({ email });

  if (emailUser) {
    return { error_code: "ERR_EMAIL_ALREADY_EXISTS" };
  }

  const usernameUser = await User.findOne({ username });
  if (usernameUser) {
    return { error_code: "ERR_USERNAME_ALREADY_EXISTS" };
  }

  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res
        .status(400)
        .json({ error: "This API call only accepts POST methods" });
    }

    const { username, email, password } = req.body;

    const errorMessage = await validate(email, username);
    if (errorMessage) {
      return res.status(400).json(errorMessage as ResponseData);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).send("ok");
  } catch (err) {
    res.status(500).json(err);
  }
}
