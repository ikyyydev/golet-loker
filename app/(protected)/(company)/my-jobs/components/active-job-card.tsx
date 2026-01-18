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

export const ActiveJobCard = ({ data }: MyJobCardProps) => {
  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle>Lowongan Aktif</CardTitle>
        <CardDescription>
          Hanya lowongan dengan status aktif akan dilihat dan bisa dilamar oleh
          kandidat
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
              <TableHead>Tanggal Posting</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.filter((list) => list.status === "ACTIVE").length > 0 ? (
              data
                .filter((list) => list.status === "ACTIVE")
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
                          <div className="size-2 rounded-full bg-green-500"></div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Aktif</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {list.updatedAt.toLocaleDateString("id-ID", {
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
                  Tidak ada lowongan yang aktif.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
