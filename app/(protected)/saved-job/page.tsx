import { auth } from "@/auth";

import { getSavedJob } from "@/common/data/jobs";
import { BackButton } from "@/components/auth/back-button";
import EmptyState from "@/components/elements/empty-state";
import JobCard from "@/components/elements/job-card";
import Container from "@/components/layouts/container";

const SavedJobPage = async () => {
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
        <div className="flex flex-col gap-y-2">
          <h2 className="text-xl md:text-2xl text-white font-bold">
            Daftar Lowongan Tersimpan
          </h2>
          <p className="text-muted-foreground">
            Semua lowongan tersimpan akan tampil di sini
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {data.map((saved) => (
            <JobCard key={saved.jobPost.id} job={saved.jobPost} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default SavedJobPage;
