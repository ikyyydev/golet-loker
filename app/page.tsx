import { Metadata } from "next";
import { unstable_noStore } from "next/cache";

import { WithContext, AboutPage } from "schema-dts";

import { METADATA } from "@/common/constant/metadata";
import Home from "@/modules/home";
import StructuredData from "@/components/elements/structured-data";

export const metadata: Metadata = {
  title: `${METADATA.sitename} | ${METADATA.description}`,
  alternates: {
    canonical: process.env.DOMAIN,
  },
};

function generateStructuredData(): WithContext<AboutPage> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: METADATA.sitename,
    url: METADATA.authors.url,
  };
}

export default async function HomePage() {
  unstable_noStore();
  return (
    <>
      <StructuredData data={generateStructuredData()} />
      <Home />
    </>
  );
}
