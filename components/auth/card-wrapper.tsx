import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import {
  GithubLoginButton,
  GoogleLoginButton,
} from "@/components/auth/social-auth-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-full h-full shadow-md py-8">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>

      {showSocial && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 mx-6"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white dark:bg-card text-card-foreground">
                atau
              </span>
            </div>
          </div>
          <CardFooter className="flex flex-col w-full gap-y-2">
            <GoogleLoginButton />
            <GithubLoginButton />
          </CardFooter>
        </>
      )}
      <CardFooter className="mx-auto">
        <span className="text-[15px]">
          {backButtonLabel}?{" "}
          <Link
            className="hover:underline text-blue-500"
            href={backButtonHref}
          >{`${backButtonHref === "/auth/login" ? "Masuk" : "Daftar"}`}</Link>
        </span>
      </CardFooter>
    </Card>
  );
};
