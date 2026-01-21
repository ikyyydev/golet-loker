import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(3, "Nama perusahaan minimal 3 karakter"),
  about: z
    .string()
    .min(10, "Berikan Informasi tentang perusahaanmu")
    .max(5000, "Panjang karakter maksimal 5000 karakter"),
  logo: z.string().url("Logo wajib diisi"),
  website: z.string().url("Masukan url yang valid"),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  about: z
    .string()
    .min(10, "Ceritakan tentang diri kamu")
    .max(3000, "Panjang karakter malsimal 3000 karakter"),
  resume: z.string().min(1, "Resume / CV wajib di isi"),
});
