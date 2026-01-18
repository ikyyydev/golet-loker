import { getCompanyByUser } from "@/common/data/company";
import { requiredUser } from "@/common/utils/requiredUser";
import { BackButton } from "@/components/auth/back-button";
import { HeadingForm } from "@/components/elements/heading-form";
import CreateJobForm from "@/components/forms/create-job-form";
import Container from "@/components/layouts/container";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const PostJobPage = async () => {
  const session = await requiredUser();
  const data = await getCompanyByUser(session?.id as string);
  return (
    <div className="py-10">
      <Container>
        <div className="flex flex-col gap-y-10">
          <BackButton label="Kembali" />
          <HeadingForm
            title="Buat Lowongan Baru"
            description="Lengkapi informasi lowongan pekerjaan yang akan ditampilkan kepada kandidat. Pastikan data yang Anda masukkan jelas dan akurat."
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5 md:mt-10">
          <div className="col-span-1 lg:col-span-2">
            <CreateJobForm
              companyName={data.name}
              companyDescription={data.about}
              companyWebsite={data.website}
              companyLocation={data.location || ""}
              companyLogo={data.logo}
            />
          </div>

          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Lowongan Saya</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PostJobPage;
