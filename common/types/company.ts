import { JobPostStatus } from "@/generated/prisma/enums";

export type MyJobsColumn = {
  id: string;
  createdAt: Date;
  jobTitle: string;
  status: JobPostStatus;
  company: {
    name: string;
    logo: string;
  } | null;
};
