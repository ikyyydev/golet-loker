import { redirect } from "next/navigation";

import { getJobEditData } from "@/common/data/company";
import { requiredUser } from "@/common/utils/requiredUser";
import { prismadb } from "@/common/libs/prismadb";

import { BackButton } from "@/components/auth/back-button";
import Container from "@/components/layouts/container";
import { HeadingForm } from "@/components/elements/heading-form";

import EditJobForm from "../components/edit-job-form";

type Params = Promise<{ jobId: string }>;

const JobIsActive = async (jobId: string) => {
  const jobIsActive = await prismadb.jobPost.findFirst({
    where: {
      id: jobId,
      status: "ACTIVE",
    },
  });

  if (jobIsActive) {
    redirect("/my-jobs");
  }

  return { error: "Lowongan yang sudah aktif tidak dapat diedit`" };
};

const EditJobPage = async ({ params }: { params: Params }) => {
  const { jobId } = await params;

  await JobIsActive(jobId);

  const user = await requiredUser();
  const data = await getJobEditData(jobId, user.id as string);

  return (
    <div className="py-10">
      <Container className="flex flex-col ">
        <div className="flex flex-col gap-y-10">
          <BackButton label="Kembali" />
          <HeadingForm
            title={`Edit Lowongan ${data.jobTitle}`}
            description="Lengkapi informasi lowongan pekerjaan yang akan ditampilkan kepada kandidat. Pastikan data yang Anda masukkan jelas dan akurat."
          />
        </div>
        <div className="grid grid-cols-1 mt-5 md:mt-10">
          <EditJobForm jobPost={data} />
        </div>
      </Container>
    </div>
  );
};

export default EditJobPage;
