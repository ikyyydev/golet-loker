import Link from "next/link";
import { MapPin } from "lucide-react";
import { FaMoneyBillWave } from "react-icons/fa";

import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/common/libs/format-currency";
import { formatRelativeTime } from "@/common/libs/format-relative-time";
import { Separator } from "../ui/separator";

interface JobCardProps {
  job: {
    id: string;
    jobTitle: string;
    location: string;
    sallaryFrom: number | null;
    sallaryTo: number | null;
    jobDescription: string;
    employmentType: string;
    createdAt: Date;
    company: {
      about: string;
      name: string;
      location: string | null;
      logo: string;
    } | null;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="shadow-lg hover:shadow-lg duration-200 hover:scale-[0.98] ease-in-out transition-transform">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <Image
              src={job?.company?.logo || ""}
              alt={job?.company?.name || ""}
              width={48}
              height={48}
              className="size-28 rounded-lg bg-contain bg-center bg-no-repeat"
            />

            <div className="flex flex-col gap-y-1 w-full">
              <div className="w-full">
                <h1 className="text-lg md:text-xl font-bold">{job.jobTitle}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-lg text-muted-foreground">
                  {job.company?.name}
                </p>
                <Badge variant={"secondary"} className="rounded-full">
                  {job.employmentType}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin size={14} />
                <span className="line-clamp-1">{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <FaMoneyBillWave size={14} />
                <p>{`${
                  job.sallaryFrom && job.sallaryTo !== null
                    ? `${formatCurrency(job.sallaryFrom)} - ${formatCurrency(
                        job.sallaryTo
                      )}`
                    : "Gaji Dirahasiakan"
                }`}</p>
              </div>
            </div>
          </div>
          <p className="text-base text-muted-foreground line-clamp-2 mt-5!">
            {job.company?.about}
          </p>
          <Separator className="my-2" />
          <p className="text-sm text-muted-foreground">
            {formatRelativeTime(job.createdAt)}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default JobCard;
