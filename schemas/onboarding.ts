import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(3, "Company name must be at least 3 characters"),
  about: z
    .string()
    .min(10, "Please provide some information about your company")
    .max(5000, "The maximum length of the description is 5000 characters"),
  logo: z.string().url("Please upload a logo"),
  website: z.string().url("Please enter a valid URL"),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  about: z
    .string()
    .min(10, "Please provide more informartion about yourself")
    .max(3000, "The maximum length of the description is 3000 characters"),
  resume: z.string().url("Please upload your cv"),
});
