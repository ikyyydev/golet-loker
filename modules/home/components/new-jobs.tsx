import Link from "next/link";

import { getNewJob } from "@/common/data/jobs";

import { HeaderSection } from "@/components/auth/header";
import JobCard from "@/components/elements/job-card";
import Container from "@/components/layouts/container";

const NewJobs = async () => {
  const newJob = await getNewJob();
  return (
    <section className="py-10 md:py-16">
      <Container>
        <div className="flex flex-col justify-center items-center space-y-5">
          <HeaderSection
            title="Eksplore Lowongan Terbaru"
            description="Test"
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {newJob.slice(0, 6).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <Link
            href={"/jobs"}
            className="w-fit py-2 px-3 rounded-md bg-primary hover:bg-primary/90 text-white transition-all duration-300 ease-in-out mt-5"
          >
            Lihat Semua
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default NewJobs;
