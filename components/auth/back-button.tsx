"use client";

import { cn } from "@/common/libs/utils";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  url?: string;
  label: string;
  className?: string;
};

export const BackButton = ({ label, url, className }: BackButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (url) {
      window.location.href = url;
    } else {
      router.back();
    }
  };

  return (
    <>
      {url ? (
        <Link
          href={url}
          passHref
          className={cn("flex items-center group", className)}
        >
          <CircleArrowLeft
            className="group-hover:-translate-x-0.5 duration-200 ease-in-out mr-1"
            size={20}
          />{" "}
          <span className="text-sm font-semibold">{label}</span>
        </Link>
      ) : (
        <span
          onClick={handleClick}
          style={{ cursor: "pointer" }}
          className={cn("flex items-center group", className)}
        >
          <CircleArrowLeft
            size={20}
            className="group-hover:-translate-x-0.5 duration-200 ease-in-out mr-1"
          />{" "}
          <span className="text-sm font-semibold">{label}</span>
        </span>
      )}
    </>
  );
};
