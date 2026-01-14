import { Suspense } from "react";

import { JobListLoading } from "@/modules/jobs/components/job-list-loading";

import { JobFilter } from "./job-filter";
import { JobList } from "./job-list";

interface JobProps {
  currentPage: number;
  jobTypes: string[];
  location: string;
  search: string;
}

export const Job = ({ currentPage, jobTypes, location, search }: JobProps) => {
  const filterKey = `search=${search};page=${currentPage};types=${jobTypes.join(
    ","
  )};location=${location}`;
  return (
    <div className="grid grid-cols-1 gap-8">
      <JobFilter />

      <div>
        <Suspense fallback={<JobListLoading />} key={filterKey}>
          <JobList
            currentPage={currentPage}
            jobTypes={jobTypes}
            location={location}
            search={search}
          />
        </Suspense>
      </div>
    </div>
  );
};
