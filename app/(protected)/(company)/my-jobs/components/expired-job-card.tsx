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

export const ExpiredJobCard = ({ data }: MyJobCardProps) => {
  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle>Lowongan Kadaluwarsa</CardTitle>
        <CardDescription>
          Lowongan yang sudah kadaluwarsa tidak dapat dilamar oleh kandidat,
          hapus lowongan jika sudah mendapatkan kandidat atau posting ulang
          lowongan jika belum mendapatkan kandidat
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
              <TableHead>Tanggal Kadaluwarsa</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.filter((list) => list.status === "EXPIRED").length > 0 ? (
              data
                .filter((list) => list.status === "EXPIRED")
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
                          <div className="size-2 rounded-full bg-yellow-500"></div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Kadaluwarsa</p>
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
                    <TableCell className="text-right">
                      <CellAction data={list} />
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={data.length} className="h-24 text-center">
                  Tidak ada lowongan kadaluwarsa.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
