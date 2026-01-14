import { getJobEditData } from "@/common/data/company";
import { requiredUser } from "@/common/utils/requiredUser";
import EditJobForm from "../components/edit-job-form";
import Container from "@/components/layouts/container";
import { HeadingForm } from "@/components/elements/heading-form";
import { BackButton } from "@/components/auth/back-button";

type Params = Promise<{ jobId: string }>;

const EditJobPage = async ({ params }: { params: Params }) => {
  const { jobId } = await params;
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
