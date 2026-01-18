import { auth } from "@/auth";
import { JobPostStatus } from "@/generated/prisma/enums";

import { getJobs } from "@/common/data/company";
import EmptyState from "@/components/elements/empty-state";
import Navbar from "@/components/layouts/navbar";
import Container from "@/components/layouts/container";
import { HeaderDashboard } from "@/components/auth/header";

import { ExpiredJobCard } from "./components/expired-job-card";
import { DraftJobCard } from "./components/draft-job-card";
import { ActiveJobCard } from "./components/active-job-card";

export interface MyJobCardProps {
  data: {
    id: string;
    status: JobPostStatus;
    jobTitle: string;
    listingDuration: number;
    createdAt: Date;
    updatedAt: Date;
    company: {
      name: string;
      logo: string;
    } | null;
  }[];
}

const MyJobs = async () => {
  const session = await auth();
  const data = await getJobs(session?.user.id as string);

  return (
    <>
      {data.length === 0 ? (
        <Container>
          <EmptyState
            title="Lowongan Kosong"
            description="Kamu belum membuat lowongan pekerjaan apapun"
          />
        </Container>
      ) : (
        <>
          <Navbar />
          <Container className="py-10">
            <div className="space-y-8 mt-5">
              <HeaderDashboard
                title="Daftar Lowongan Saya"
                description="Kelola status lowongan, update, salin url hingga hapus lowongan kamu disini"
              />
              <ActiveJobCard data={data} />
              <DraftJobCard data={data} />
              <ExpiredJobCard data={data} />
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default MyJobs;
