import { HeaderDashboard } from "@/components/auth/header";
import Container from "@/components/layouts/container";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingFavoritePage = () => {
  return (
    <Container className="py-10">
      <Skeleton className="h-3 w-20 mb-5" />
      <div className="space-y-8 mt-5">
        <HeaderDashboard
          title="Daftar Lowongan Favorit"
          description="Semua lowongan yang disimpan sebagai favorit akan tersimpan disini"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {[...Array(8)].map((_, index) => (
            <Card className="p-6" key={index}>
              <div className="flex flex-col gap-4">
                <Skeleton className="size-28 rounded" />
                <div className="flex flex-col gap-y-1 w-full">
                  <Skeleton className="h-5 w-full" />
                  <div className="flex flex-wrap items-center gap-2">
                    <Skeleton className="h-5 w-[100px]" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-[200px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                </div>
                <Separator />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default LoadingFavoritePage;
