import Image from "next/image";

import { companies } from "@/common/constant/home";

import { HeaderSection } from "@/components/auth/header";
import MarqueeElement from "@/components/elements/marquee-element";
import Container from "@/components/layouts/container";

const CompanyList = () => {
  return (
    <section className="py-10 md:py-16">
      <Container className="space-y-5">
        <HeaderSection title="Dipercaya Oleh 1000+ Perusahaan Ternama" />
        <MarqueeElement>
          <div className="flex overflow-x-hidden">
            {companies.map((slider) => (
              <Image
                key={slider.id}
                src={slider.url}
                width={150}
                height={150}
                alt="Logo Perusahaan"
                className="mr-3 bg-transparent dark:bg-white w-28 h-20 object-contain"
              />
            ))}
          </div>
        </MarqueeElement>
      </Container>
    </section>
  );
};

export default CompanyList;
