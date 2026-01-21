import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
  confirmPassword: z.string().min(1, "Konfirmasi kata sandi wajib diisi"),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
  confirmPassword: z.string().min(1, "Konfirmasi kata sandi wajib diisi"),
});
