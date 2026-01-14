"use client";

import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFounPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-svh py-10 md:py-16 flex justify-center items-center">
      <Container>
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="border-2 border-foreground px-8 py-5 rounded-md lg:w-lg max-w-lg">
            <h1 className="text-9xl tracking-widest text-foreground font-bold text-center">
              404
            </h1>
          </div>
          <h2 className="text-2xl font-semibold">Oops!</h2>
          <p className="text-sm text-muted-foreground text-center max-w-lg">
            Maaf halaman yang kamu cari tidak dapat di temukan atau telah di
            pindahkan. Cek kembali alamat URL atau gunakan tombol di bawah ini
            untuk kembali ke halaman utama.
          </p>
          <Button
            onClick={() => router.back()}
            size={"icon-sm"}
            className="w-fit py-2 px-3 cursor-pointer"
          >
            Kembali <ArrowRightCircle />
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default NotFounPage;
