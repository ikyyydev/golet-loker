import { auth } from "@/auth";
import { isUserCompany } from "@/common/data/user";
import Container from "@/components/layouts/container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingJobIdPage = async () => {
  const session = await auth();
  const isCompany = await isUserCompany(session?.user.id as string);
  const isCompanyLoading = isCompany ? 2 : 3;
  return (
    <Container className="pt-20 pb-10 md:pt-28 md:pb-16">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="space-y-5 col-span-2">
          <div className="flex flex-col items-start justify-between gap-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="size-16 rounded-lg" />
              <Skeleton className="h-9 w-[200px]" />
            </div>
            <Skeleton className="h-9 w-[300px]" />
            <Skeleton className="h-9 w-[350px]" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-[100px] rounded-full" />
              <Skeleton className="h-5 w-[100px] rounded-full" />
            </div>
            <section className="space-y-3 mt-5 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </section>
            <section className="flex flex-wrap gap-3 mt-5">
              {[...Array(20)].map((_, index) => (
                <Skeleton key={index} className="h-7 w-[180px] rounded-full" />
              ))}
            </section>
            <Card className="mt-5 w-full">
              <CardHeader>
                <Skeleton className="h-5 w-[200px]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  <div className="flex gap-3 items-center">
                    <Skeleton className="size-16 rounded-lg" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-5 w-[200px]" />
                      <Skeleton className="h-3 w-[150px]" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <Separator />
                  <Skeleton className="h-3 w-[100px]" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Roght Content */}
        <div className="space-y-5">
          {[...Array(isCompanyLoading)].map((_, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <Skeleton className="h-5 w-[100px]" />
              </CardHeader>
              <CardContent className="space-y-1.5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default LoadingJobIdPage;
