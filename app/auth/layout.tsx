import { BackButton } from "@/components/auth/back-button";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[url('/img/building.jpg')] bg-no-repeat bg-center bg-cover p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-black/55 bg-blend-color">
      <div className="flex flex-col justify-between col-span-1 lg:col-span-2 py-5 px-8">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <h1 className="text-2xl text-white font-bold">
              Golet<span className="text-primary">Loker</span>
            </h1>
          </Link>
          <BackButton label="Kembali" className="text-white" />
        </div>
        <div className="w-full md:flex flex-col space-y-3 hidden">
          <h2 className="text-4xl lg:text-6xl font-smeibold text-white">
            Temukan Karir Terbaikmu, Mulai dari sini
          </h2>
          <p className="text-[18px] max-w-2xl text-slate-200 tracking-wide leading-tight">
            Masuk atau daftar untuk mengakses ribuan lowongan kerja terpercaya,
            bangun profil profesionalmu, dan wujudkan peluang karier yang sesuai
            dengan keahlian serta tujuanmu.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
