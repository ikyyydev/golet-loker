import { getJobsIsActive } from "@/common/data/jobs";

import EmptyState from "@/components/elements/empty-state";
import JobCard from "@/components/elements/job-card";
import { MainPagination } from "@/components/elements/main-pagination";

export const JobList = async ({
  currentPage,
  jobTypes,
  location,
  search,
}: {
  currentPage: number;
  jobTypes: string[];
  location: string;
  search: string;
}) => {
  const { jobs, totalPage } = await getJobsIsActive({
    page: currentPage,
    pageSize: 2,
    jobTypes: jobTypes,
    location: location,
    search: search,
  });
  return (
    <>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Lowongan Kosong"
          description="Tidak ada lowongan yang tersedia"
          buttonLabel="Reset Filter"
          href="/jobs"
        />
      )}

      <div className="flex justify-center mt-8">
        <MainPagination totalPage={totalPage} currentPage={currentPage} />
      </div>
    </>
  );
};
