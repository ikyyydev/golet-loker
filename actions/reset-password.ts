"use server";

import { getUserByEmail } from "@/common/data/user";
import { sendPasswordResetEmail } from "@/common/libs/mail";
import { generatePasswordResetToken } from "@/common/libs/tokens";
import { ResetPasswordSchema } from "@/schemas";
import * as z from "zod";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validateField = ResetPasswordSchema.safeParse(values);

  if (!validateField.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validateField.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent" };
};
