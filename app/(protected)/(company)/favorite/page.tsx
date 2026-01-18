import { auth } from "@/auth";

import { getSavedJob } from "@/common/data/jobs";
import { BackButton } from "@/components/auth/back-button";
import { HeaderDashboard } from "@/components/auth/header";
import EmptyState from "@/components/elements/empty-state";
import JobCard from "@/components/elements/job-card";
import Container from "@/components/layouts/container";

const FavoritePage = async () => {
  const session = await auth();
  const data = await getSavedJob(session?.user.id as string);

  if (data.length === 0) {
    return (
      <Container className="min-h-svh justify-center pt-10 space-y-5">
        <BackButton label="Kembali" />
        <EmptyState
          title="Lowongan Kosong"
          description="Tidak ada lowongan yang tersimpan"
        />
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <BackButton label="Kembali" className="mb-5" />
      <div className="space-y-8">
        <HeaderDashboard
          title="Daftar Lowongan Favorit"
          description="Semua lowongan yang disimpan sebagai favorit akan tersimpan disini"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {data.map((saved) => (
            <JobCard key={saved.jobPost.id} job={saved.jobPost} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FavoritePage;
