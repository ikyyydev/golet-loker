"use client";

import { Bookmark } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "./button";
import { Spinner } from "./spinner";
import { cn } from "@/common/libs/utils";

export const SaveJobButton = ({ saveJob }: { saveJob: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      size={"lg"}
      variant={"outline"}
      type="submit"
      disabled={pending}
      className="w-full"
    >
      {pending ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <Bookmark
            className={cn(
              saveJob ? "fill-current" : "",
              "size-4 transition-colors"
            )}
          />
          {saveJob ? "Batal Simpan" : "Simpan"}
        </>
      )}
    </Button>
  );
};
