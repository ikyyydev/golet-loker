"use client";

import { Ban } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type EmptyStateProps = {
  title: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  buttonLabel,
  href,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-center text-sm leading-tight text-muted-foreground max-w-sm text-balance">
        {description}
      </p>
      {buttonLabel && (
        <Button onClick={() => router.push(href || "/")}>{buttonLabel}</Button>
      )}
    </div>
  );
};

export default EmptyState;
