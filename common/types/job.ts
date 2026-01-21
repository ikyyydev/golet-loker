import { Session } from "next-auth";

export interface IJobItem {
  data: {
    id: string;
    jobTitle: string;
    employmentType: string;
    location: string;
    sallaryFrom: number | null;
    sallaryTo: number | null;
    jobDescription: string;
    listingDuration: number;
    benefits: string[];
    createdAt: Date;
    company: {
      location: string | null;
      name: string;
      about: string;
      logo: string;
    } | null;
  } | null;
  savedJob?: {
    id: string;
  } | null;
  jobId: string;
  isCompany?: boolean;
  session: Session | null;
}

export interface IJobItemProps {
  job: IJobItem[];
}
