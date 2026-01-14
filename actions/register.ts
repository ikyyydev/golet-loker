"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { prismadb } from "@/common/libs/prismadb";
import { getUserByEmail } from "@/common/data/user";
import { generateVerificationToken } from "@/common/libs/tokens";
import { sendVerificationEmail } from "@/common/libs/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, name, password, confirmPassword } = validateFields.data;

  if (confirmPassword !== password) {
    return { error: "Passwords do not match" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exists" };
  }

  await prismadb.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: "User has been created, check your email for verification!",
  };
};
