import { Metadata } from "next";

import { METADATA } from "@/common/constant/metadata";
import ComingSoon from "@/components/layouts/coming-soon";

export const metadata: Metadata = {
  title: `Artikel | ${METADATA.sitename}`,
  description: "Temukan artikel terupdate tentang pekerjaan",
  keywords: "artikel, golet loker",
  alternates: {
    canonical: `${process.env.DOMAIN}/articles`,
  },
};

export default function ArticlesPage() {
  return <ComingSoon />;
}
