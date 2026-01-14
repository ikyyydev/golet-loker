import Image from "next/image";
import { auth } from "@/auth";

import { getJobs } from "@/common/data/company";
import EmptyState from "@/components/elements/empty-state";
import Navbar from "@/components/layouts/navbar";
import Container from "@/components/layouts/container";
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
import { CellAction } from "./components/cell-action";

const MyJobs = async () => {
  const session = await auth();
  const data = await getJobs(session?.user.id as string);

  return (
    <>
      {data.length === 0 ? (
        <Container>
          <EmptyState
            title="Lowongan Kosong"
            description="Kamu belum membuat lowongan pekerjaan apapun"
          />
        </Container>
      ) : (
        <>
          <Navbar />
          <Container>
            <Card className="mt-10">
              <CardHeader>
                <CardTitle>Lowongan Saya</CardTitle>
                <CardDescription>
                  Atur lowongan dan pelamar disini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Logo</TableHead>
                      <TableHead>Nama Perusahaan</TableHead>
                      <TableHead>Posisi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tanggal Posting</TableHead>
                      <TableHead className="text-right">Tindakan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((list) => (
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
                        <TableCell>
                          {list.status.charAt(0).toUpperCase() +
                            list.status.slice(1).toLowerCase()}
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
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Container>
        </>
      )}
    </>
  );
};

export default MyJobs;
