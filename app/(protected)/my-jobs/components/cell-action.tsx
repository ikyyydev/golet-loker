"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Copy, MoreHorizontal, SquarePen, Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteJob } from "@/actions/company";
import { MyJobsColumn } from "@/common/types/company";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  ToastErrorOption,
  ToastSuccessOption,
} from "@/components/toast-option";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CellActionProps {
  data: MyJobsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = (jobIdUrl: string) => {
    if (data.status === "DRAFT") {
      return toast.error(
        "Gagal menyalin URL, Pastikan status lowongan aktif",
        ToastErrorOption
      );
    } else {
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_APP_URL}/jobs/${jobIdUrl}`
      );
      toast.success("URL berhasil disalin", ToastSuccessOption);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteJob(data.id);
      router.refresh();
      toast.success("Lowongan berhasil dihapus", ToastSuccessOption);
    } catch {
      toast.error("Terjadi kesalahan", ToastErrorOption);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        title="Apakah kamu yakin?"
        description="Lowongan yang telah dihapus tidak dapat dikembalikan."
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="focus:ring-0 focus:outline-0 focus:border-none"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Pilih aksi</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/my-jobs/${data.id}/edit`}>
              <SquarePen />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCopy(data.id)}>
            <Copy />
            Salin URL
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
