import Link from "next/link";
import { ChevronRight, Handshake, MapPin } from "lucide-react";
import Image from "next/image";

import { saveJob, unSaveJob } from "@/actions/company";
import { cn } from "@/common/libs/utils";
import { benefits } from "@/common/data/benefits";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JsonToHtml } from "@/components/ui/json-to-html";
import { Separator } from "@/components/ui/separator";
import { SaveJobButton } from "@/components/ui/submit-buton";
import { IJobItem } from "@/common/types/job";

export const JobDetail = ({
  data,
  savedJob,
  jobId,
  isCompany,
  session,
}: IJobItem) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Content */}
      <div className="space-y-5 col-span-1 lg:col-span-2">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex gap-3 items-center">
              <Image
                src={data?.company?.logo || ""}
                alt={data?.company?.name || ""}
                width={48}
                height={48}
                className="size-16 rounded-lg bg-contain bg-center bg-no-repeat"
              />
              <Link
                href={`/companies`}
                className="hover:underline text-sm md:text-lg"
              >
                {data?.company?.name}
              </Link>
            </div>
            <h1 className="text-3xl font-bold">{data?.jobTitle}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={18} />
              <span>{data?.location}</span>
            </div>
            <Badge
              variant={"outline"}
              className="rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground border-muted-foreground hover:border- hover:cursor-pointer duration-100 transition-all ease-in"
            >
              {data?.employmentType}
            </Badge>
          </div>
        </div>
        <section>
          <h3 className="font-semibold text-lg mb-4">Deskripsi Pekerjaan</h3>
          <JsonToHtml json={JSON.parse(data?.jobDescription || "")} />
        </section>
        <section>
          <h3 className="font-semibold text-lg mb-4">Apa yang kamu dapatkan</h3>
          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit) => {
              const isOffered = data?.benefits.includes(benefit.id);
              return (
                <Badge
                  key={benefit.id}
                  variant={isOffered ? "default" : "outline"}
                  className={cn(
                    !isOffered ? "opacity-75 cursor-not-allowed" : "",
                    "text-sm px-4 py-1.5 rounded-full"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {benefit.icon}
                    {benefit.label}
                  </span>
                </Badge>
              );
            })}
          </div>
        </section>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Tentang Perusahaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="flex gap-3 items-center">
                <Image
                  src={data?.company?.logo || ""}
                  alt={data?.company?.name || ""}
                  width={48}
                  height={48}
                  className="size-16 rounded-lg bg-contain bg-center bg-no-repeat"
                />
                <div>
                  <Link
                    href={`/companies`}
                    className="hover:underline text-sm md:text-lg font-semibold"
                  >
                    {data?.company?.name}
                  </Link>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    1.000+ pengikut
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-muted-foreground">
                  {data?.company?.about}
                </p>
              </div>

              <Separator />

              <Link href={`/company`} className="mx-auto">
                <Button variant={"link"}>
                  Lihat Detail <ChevronRight className="size-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Content */}
      <div className="space-y-5 w-full">
        <Card>
          <div className="space-y-3">
            <CardHeader>
              <CardTitle>Batas Waktu Pekerjaan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="text-sm text-muted-foreground font-semibold">
                  Lamar sebelum
                </h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(
                    (data?.createdAt?.getTime() ?? 0) +
                      (data?.listingDuration ?? 0) * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-sm text-muted-foreground font-semibold">
                  Diposting pada
                </h3>
                <p className="text-sm text-muted-foreground">
                  {data?.createdAt.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </CardContent>
          </div>
        </Card>
        <Card>
          <div className="space-y-3">
            <CardHeader>
              <CardTitle className="font-semibold">
                Simpan Sebagai Favorit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mt-1">
                Klik tombol di bawah untuk menyimpan pekerjaan ini sebagai
                favorit
              </p>
            </CardContent>
            <CardFooter className="grid grid-cols-1">
              <form
                action={
                  savedJob
                    ? unSaveJob.bind(null, savedJob.id)
                    : saveJob.bind(null, jobId)
                }
                className="cursor-pointer w-full"
              >
                <SaveJobButton saveJob={!!savedJob} />
              </form>
            </CardFooter>
          </div>
        </Card>
        {!isCompany && session?.user.id && (
          <Card>
            <div className="space-y-3">
              <CardHeader>
                <CardTitle className="font-semibold">Lamar Sekarang</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mt-1">
                  Klik tombol di bawah untuk mengajukan lamaran dan beri tahu{" "}
                  {data?.company?.name} bahwa kamu siap bergabung.
                </p>
              </CardContent>
              <CardFooter className="grid grid-cols-1">
                <Button size={"lg"} className="cursor-pointer w-full">
                  <Handshake className="size-4" />
                  Lamar Mudah
                </Button>
              </CardFooter>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
