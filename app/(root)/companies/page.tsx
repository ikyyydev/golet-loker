import { Metadata } from "next";

import { METADATA } from "@/common/constant/metadata";
import ComingSoon from "@/components/layouts/coming-soon";

export const metadata: Metadata = {
  title: `Perusahaan | ${METADATA.sitename}`,
  description: "Temukan perusahaan terbaik",
  keywords: "perusahaan, golet loker",
  alternates: {
    canonical: `${process.env.DOMAIN}/companies`,
  },
};

export default function CompaniesPage() {
  return <ComingSoon />;
}
