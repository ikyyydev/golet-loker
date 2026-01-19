import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { isUserSeeker } from "@/common/data/user";

interface SeekerLayoutProps {
  children: React.ReactNode;
}

export default async function SeekerLayout({ children }: SeekerLayoutProps) {
  const session = await auth();
  const IsUserSeeker = await isUserSeeker(session?.user.id as string);

  if (!IsUserSeeker) {
    redirect("/");
  }
  return children;
}
