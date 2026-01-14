import { request } from "@arcjet/next";
import { Metadata } from "next";
import { auth } from "@/auth";

import { getJobsIsActiveByJobId } from "@/common/data/jobs";
import arcjet, { detectBot, tokenBucket } from "@/common/utils/arcjet";
import { isUserCompany } from "@/common/data/user";
import { METADATA } from "@/common/constant/metadata";

import { BackButton } from "@/components/auth/back-button";
import Container from "@/components/layouts/container";
import { JobDetail } from "@/modules/jobs/components/job-detail";

type Params = Promise<{ jobId: string }>;

interface JobDetailPageProps {
  params: { jobId: string };
}

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
  })
);

const getClient = (session: boolean) => {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE",
        capacity: 100,
        interval: 60,
        refillRate: 30,
      })
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE",
        capacity: 100,
        interval: 60,
        refillRate: 10,
      })
    );
  }
};

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { jobId } = await params;
  const job = await getJobsIsActiveByJobId(jobId);
  return {
    title: `${job.jobData?.jobTitle} | ${METADATA.sitename}`,
    description: job.jobData?.jobDescription,
    openGraph: {
      images: job.jobData?.company?.logo,
      url: `${METADATA.openGraph.url}/jobs/${jobId}`,
      siteName: METADATA.openGraph.sitename,
      locale: METADATA.openGraph.locale,
      type: "article",
      authors: METADATA.creator,
    },
    keywords: `lowongan ${job.jobData?.jobTitle}, lowongan${job.jobData?.company?.name}`,
    alternates: {
      canonical: `${process.env.DOMAIN}/jobs/${jobId}`,
    },
  };
}

export default async function JobIdPage({ params }: { params: Params }) {
  const { jobId } = await params;
  const session = await auth();
  const isCompany = await isUserCompany(session?.user.id as string);

  const req = await request();
  const decision = await getClient(!!session).protect(req, { requested: 10 });

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const { jobData: data, savedJob } = await getJobsIsActiveByJobId(
    jobId,
    session?.user.id
  );
  return (
    <Container className="py-10 md:py-16">
      <BackButton label="Kembali" className="mb-10 text-muted-foreground" />
      <JobDetail
        data={data}
        jobId={jobId}
        savedJob={savedJob}
        isCompany={isCompany}
        session={session}
      />
    </Container>
  );
}
