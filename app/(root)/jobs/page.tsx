import { Metadata } from "next";

import Job from "@/modules/jobs";
import { METADATA } from "@/common/constant/metadata";

import Navbar from "@/components/layouts/navbar";
import Container from "@/components/layouts/container";
import Footer from "@/components/layouts/footer";

type SearchParams = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
    search?: string;
  }>;
};

export const metadata: Metadata = {
  title: `Lowongan | ${METADATA.sitename}`,
  description: "Temukan lowongan pekerjaan terbaru yang kamu inginkan",
  keywords: "lowongan pekerjaan, golet loker",
  alternates: {
    canonical: `${process.env.DOMAIN}/jobs`,
  },
};

const JobsPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const currentPage = Number(params.page || 1);
  const jobTypes = params.jobTypes?.split(",") || [];
  const location = params.location || "";
  const search = params.search || "";

  return (
    <>
      <Navbar />

      <Container className="py-10 md:py-16">
        <Job
          currentPage={currentPage}
          jobTypes={jobTypes}
          location={location}
          search={search}
        />
      </Container>

      <Footer />
    </>
  );
};

export default JobsPage;
