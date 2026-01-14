import Link from "next/link";
import Container from "./container";

import {
  aboutMenu,
  accountMenu,
  FooterMenu,
  quickMenu,
  socialsFooter,
} from "@/common/constant/footer";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <footer className="pt-10 md:pt-16 pb-5 bg-slate-900">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8">
          <div className="flex flex-col">
            <Link href={"/"} className="mr-8 mb-3">
              <h1 className="text-2xl font-bold text-white">
                Golet<span className="text-primary">Loker</span>
              </h1>
            </Link>
            <div className="flex gap-3">
              {socialsFooter.map((social) => (
                <Tooltip key={social.label}>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      className="p-3 bg-primary hover:bg-primary/90 text-white rounded-full"
                    >
                      {social.icon}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-black">
                    <p>{social.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold capitalize mb-5 text-white">
              Link Cepat
            </h3>
            <ul className="space-y-2">
              {quickMenu.map((menu: FooterMenu) => (
                <li
                  className="group text-sm font-normal text-slate-300"
                  key={menu.label}
                >
                  <Link href={menu.url} className="group-hover:underline">
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white capitalize mb-5">
              Akun
            </h3>
            <ul className="space-y-2">
              {accountMenu.map((menu: FooterMenu) => (
                <li
                  className="group text-sm font-normal text-slate-300"
                  key={menu.label}
                >
                  <Link href={menu.url} className="group-hover:underline">
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold capitalize mb-5 text-white">
              Tentang Kami
            </h3>
            <ul className="space-y-2">
              {aboutMenu.map((menu: FooterMenu) => (
                <li
                  className="group text-sm font-normal text-slate-300"
                  key={menu.label}
                >
                  <Link href={menu.url} className="group-hover:underline">
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-3 mt-8 bg-muted-foreground" />

        <div className="flex items-center justify-center">
          <p className="text-xs font-normal text-slate-300">
            &copy; 2026 Goletloker.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
