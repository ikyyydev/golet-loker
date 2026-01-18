"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CircleOff,
  Copy,
  MoreHorizontal,
  PencilLine,
  SquarePen,
  Trash,
} from "lucide-react";
import { toast } from "sonner";

import { changeIsActive, changeIsExpired, deleteJob } from "@/actions/company";
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
import { Separator } from "@/components/ui/separator";

type ConfirmAction = "DELETE" | "ACTIVE" | "EXPIRE" | null;

interface CellActionProps {
  data: MyJobsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  useEffect(() => {
    if (error) {
      toast.error(error, ToastErrorOption);
    }
    if (success) {
      toast.success(success, ToastSuccessOption);
    }
  }, [error, success]);

  const handleCopy = (jobIdUrl: string) => {
    if (data.status === "DRAFT") {
      return toast.error(
        "Gagal menyalin URL, Pastikan status lowongan aktif",
        ToastErrorOption,
      );
    } else {
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_APP_URL}/jobs/${jobIdUrl}`,
      );
      toast.success("URL berhasil disalin", ToastSuccessOption);
    }
  };

  const handleChangeIsActive = async () => {
    try {
      setLoading(true);
      changeIsActive(data.id).then((res) => {
        setError(res?.error);
        setSuccess(res?.success);
      });
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan", ToastErrorOption);
    } finally {
      setLoading(false);
      setSuccess("");
      setError("");
      setConfirmAction(null);
    }
  };

  const handleChangeIsExpired = async () => {
    try {
      setLoading(true);
      changeIsExpired(data.id).then((res) => {
        setError(res?.error);
        setSuccess(res?.success);
      });
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan", ToastErrorOption);
    } finally {
      setLoading(false);
      setSuccess("");
      setError("");
      setConfirmAction(null);
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
      setSuccess("");
      setError("");
      setConfirmAction(null);
    }
  };

  const confirmConfig = {
    DELETE: {
      title: "Apakah kamu yakin?",
      description: "Lowongan yang sudah terhapus tidak dapat di kembalikan.",
      onConfirm: handleDelete,
    },
    ACTIVE: {
      title: "Apakah kamu yakin?",
      description:
        "Lowongan yang sudah di posting tidak dapat di edit, pastikan data lowongan sudah benar.",
      onConfirm: handleChangeIsActive,
    },
    EXPIRE: {
      title: "Apakah kamu yakin?",
      description: "Lowongan akan di tutup dan kandidat tidak dapat melamar.",
      onConfirm: handleChangeIsExpired,
    },
  };

  return (
    <>
      {confirmAction && (
        <AlertModal
          isOpen={true}
          loading={loading}
          onClose={() => setConfirmAction(null)}
          onConfirm={confirmConfig[confirmAction].onConfirm}
          title={confirmConfig[confirmAction].title}
          description={confirmConfig[confirmAction].description}
        />
      )}

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
          <Separator />
          {data.status === "DRAFT" && (
            <>
              <DropdownMenuItem onClick={() => setConfirmAction("ACTIVE")}>
                <PencilLine />
                Posting
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/my-jobs/${data.id}/edit`}>
                  <SquarePen />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setConfirmAction("DELETE")}>
                <Trash />
                Hapus
              </DropdownMenuItem>
            </>
          )}
          {data.status === "ACTIVE" && (
            <>
              <DropdownMenuItem onClick={() => handleCopy(data.id)}>
                <Copy />
                Salin URL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setConfirmAction("EXPIRE")}>
                <CircleOff />
                Akhiri Lowongan
              </DropdownMenuItem>
            </>
          )}
          {data.status === "EXPIRED" && (
            <DropdownMenuItem onClick={() => setConfirmAction("DELETE")}>
              <Trash />
              Hapus
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
