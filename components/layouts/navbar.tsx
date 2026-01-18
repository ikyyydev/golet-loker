import Link from "next/link";
import { auth } from "@/auth";

import { isUserCompany } from "@/common/data/user";

import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Container from "@/components/layouts/container";
import { UserDropdown } from "@/components/ui/user-dropdown";
import { NavMenu } from "@/components/elements/nav-menu";
import MobileNav from "@/components/elements/mobile-nav";

const Navbar = async () => {
  const session = await auth();
  const userIsCompany = await isUserCompany(session?.user.id as string);
  return (
    <nav className="bg-background z-40 py-6">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={"/"} className="mr-8">
              <h1 className="text-2xl font-bold">
                Golet<span className="text-primary">Loker</span>
              </h1>
            </Link>
            <NavMenu />
          </div>
          <div className="flex items-center">
            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />
              {userIsCompany && session?.user.id && (
                <Link
                  href={"/post-job"}
                  className={buttonVariants({ size: "sm" })}
                >
                  Posting
                </Link>
              )}
            </div>
            {session?.user ? (
              <UserDropdown
                email={session.user.email as string}
                name={session.user.name as string}
                image={session.user.image as string}
                userIsCompany={userIsCompany}
              />
            ) : (
              <div className="hidden lg:flex items-center gap-x-2 ml-2">
                <Link href={"/auth/register"}>
                  <Button variant={"outline"} size={"sm"}>
                    Daftar
                  </Button>
                </Link>
                <Link href={"/auth/login"}>
                  <Button variant={"default"} size={"sm"}>
                    Masuk
                  </Button>
                </Link>
              </div>
            )}
            <MobileNav session={session} isCompany={userIsCompany} />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
