"use server";

import { getPasswordResetTokenByToken } from "@/common/data/password-reset-token";
import { getUserByEmail } from "@/common/data/user";
import { prismadb } from "@/common/libs/prismadb";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validateField = NewPasswordSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "Invalid fields!" };
  }

  const { password, confirmPassword } = validateField.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  if (confirmPassword !== password) {
    return { error: "Passwords do not match!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prismadb.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prismadb.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password reset successfully!" };
};
