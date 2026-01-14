"use client";

import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { cn } from "@/common/libs/utils";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

type MobileNavProps = {
  session: Session | null;
  isCompany: boolean;
};

const MobileNav = ({ session, isCompany }: MobileNavProps) => {
  const pathname = usePathname();
  const routes = [
    {
      href: "/jobs",
      label: "Lowongan",
      active: pathname === `/jobs`,
    },
    {
      href: "/companies",
      label: "Perusahaan",
      active: pathname === `/companies`,
    },
    {
      href: "/articles",
      label: "Artikel",
      active: pathname === `/articles`,
    },
  ];
  return (
    <Sheet>
      <SheetTrigger className="flex lg:hidden justify-center items-center">
        <CiMenuFries className="text-3xl text-primary" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="px-5">
          {/* Logo */}
          <div className="mt-20 mb-10 text-center text-2xl flex justify-center">
            <Link href={"/"} className="mr-8">
              <h1 className="text-2xl font-bold">
                Golet<span className="text-primary">Loker</span>
              </h1>
            </Link>
          </div>
          {/* Nav Menu */}
          <div className="flex flex-col gap-5 justify-center items-center">
            {routes.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "py-2 px-3 rounded-md text-xl text-muted-foreground w-full capitalize font-semibold hover:text-primary transition-all duration-100",
                    item.active ? "text-primary" : ""
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          {session?.user.id && isCompany && (
            <Button type="button" size={"lg"} className="w-full mt-5">
              Posting Lowongan
            </Button>
          )}
          {!session?.user && (
            <div className="flex lg:hidden items-center gap-x-2 mt-5">
              <Link href={"/auth/register"} className="w-full">
                <Button variant={"outline"} size={"lg"} className="w-full">
                  Daftar
                </Button>
              </Link>
              <Link href={"/auth/login"} className="w-full">
                <Button variant={"default"} size={"lg"} className="w-full">
                  Masuk
                </Button>
              </Link>
            </div>
          )}
        </SheetTitle>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
