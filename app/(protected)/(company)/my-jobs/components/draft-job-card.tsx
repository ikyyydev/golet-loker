import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CellAction } from "./cell-action";
import { MyJobCardProps } from "../page";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const DraftJobCard = ({ data }: MyJobCardProps) => {
  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle>Draft Lowongan</CardTitle>
        <CardDescription>
          Kandidat tidak dapat melihat lowongan, ubah status lowongan menjadi
          aktif agar kandidat dapat melihat dan melamar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Nama Perusahaan</TableHead>
              <TableHead>Posisi</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.filter((list) => list.status === "DRAFT").length > 0 ? (
              data
                .filter((list) => list.status === "DRAFT")
                .map((list) => (
                  <TableRow key={list.id}>
                    <TableCell>
                      <Image
                        src={list.company?.logo as string}
                        alt={list.company?.name as string}
                        width={40}
                        height={40}
                        className="rounded-md size-10"
                      />
                    </TableCell>
                    <TableCell>{list.company?.name}</TableCell>
                    <TableCell>{list.jobTitle}</TableCell>
                    <TableCell className="text-center">
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="size-2 rounded-full bg-red-500"></div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Draft</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {list.createdAt.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>{list.listingDuration} hari</TableCell>
                    <TableCell className="text-right">
                      <CellAction data={list} />
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={data.length} className="h-24 text-center">
                  Draft Kosong
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
