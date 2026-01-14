"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/common/libs/utils";

export function NavMenu({
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
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
    <div
      className={cn(
        "hidden lg:flex items-center space-x-4 lg:space-x-6",
        className
      )}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary dark:white" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}
