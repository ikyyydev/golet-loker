import Image from "next/image";
import { ArrowRight } from "lucide-react";

import HeroImage from "@/public/img/herosec.png";

import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";

import SearchBar from "./search-bar";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[url('/img/hiring.jpg')] bg-center bg-no-repeat bg-cover">
      <div className="absolute inset-0 bg-black/60" />
      <Container className="relative z-10 flex min-h-screen items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
          {/* Left */}
          <div className="flex flex-col justify-center text-white max-w-xl order-2 lg:order-1">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Selamat Datang di <br />
              Golet
              <span className="text-primary">Loker</span>
            </h1>

            <p className="mt-6 text-lg text-mutedforeground">
              Kami menghubungkan pencari kerja dengan perusahaan terpercaya dari
              berbagai industri. Temukan lowongan yang sesuai dengan keahlian,
              lokasi, dan tujuan kariermu.
            </p>

            <Button
              size={"lg"}
              type="button"
              className="w-fit mt-5 cursor-pointer"
            >
              Cek Lowongan <ArrowRight />
            </Button>
            <SearchBar className="mt-8 lg:mt-10" />
          </div>
          {/* Right */}
          <div className="relative flex justify-center items-center order-1 lg:order-2">
            <Image
              src={HeroImage}
              alt="Secretary"
              width={380}
              height={500}
              className="relative z-10 object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
