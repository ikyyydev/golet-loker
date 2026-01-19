import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { isUserCompany } from "@/common/data/user";

interface CompanyLayoutProps {
  children: React.ReactNode;
}

export default async function CompanyLayout({ children }: CompanyLayoutProps) {
  const session = await auth();
  const IsUserCompany = await isUserCompany(session?.user.id as string);

  if (!IsUserCompany) {
    redirect("/");
  }
  return children;
}
