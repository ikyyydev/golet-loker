import { z } from "zod";

export const jobSchema = z.object({
  jobTitle: z
    .string()
    .min(3, "Judul lowongan tidak boleh kurang dari 3 karakter"),
  jobDescription: z
    .string()
    .min(10, "Deskripsi lowongan tidak boleh kurang dari 10 karakter"),
  employmentType: z.string().min(3, "Pilih tipe pekerjaan"),
  location: z.string().min(3, "Pilih lokasi"),
  sallaryFrom: z.number().optional(),
  sallaryTo: z.number().optional(),
  listingDuration: z.number().min(1, "Durasi lowongan wajib diisi"),
  benefits: z.array(z.string()).min(1, "Pilih setidaknya satu benefit"),
  companyName: z.string().min(1, "Nama perusahaan wajib diisi"),
  companyLocation: z.string().min(1, "Lokasi perusahaan wajib diisi"),
  companyAbout: z.string().min(1, "Deskripsi perusahaan wajib diisi"),
  companyLogo: z.string().min(1, "Logo perusahaan wajib diisi"),
  companyWebsite: z.string().min(1, "Website perusahaan wajib diisi"),
});

export const searchSchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
});

export const jobApplicationSchema = z.object({
  coverLetter: z.string().optional(),
  resume: z.string().min(1, "Resume / CV wajib diisi"),
});
