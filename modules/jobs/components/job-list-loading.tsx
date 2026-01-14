import { Card } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Skeleton } from "../../../components/ui/skeleton";

export const JobListLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, index) => (
        <Card className="p-6" key={index}>
          <div className="flex flex-col gap-4">
            <Skeleton className="size-28 rounded" />
            <div className="flex flex-col gap-y-1 w-full">
              <Skeleton className="h-5 w-[300px]" />
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
  );
};
