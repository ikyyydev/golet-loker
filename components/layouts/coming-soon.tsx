import Countdown from "@/components/elements/countdonw";
import { BackButton } from "@/components/auth/back-button";

export default function ComingSoon() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary-40 via-primary/60 to-primary/80 px-4 text-white">
      <section className="w-full flex flex-col justify-center items-center max-w-3xl rounded-3xl bg-white/5 p-10 text-center shadow-2xl backdrop-blur">
        <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Segera Hadir!</h1>

        <p className="mb-10 text-sm text-slate-200">
          Halaman sedang dalam tahap perbaikan.
          <br />
          Kami akan segera hadir dengan fitur baru.
        </p>

        <Countdown />

        <BackButton
          label="Kembali ke Beranda"
          url="/"
          className="backdrop-blur-3xl text-white py-2 px-3 rounded-md text-sm w-fit mt-8"
        />
      </section>
    </main>
  );
}
