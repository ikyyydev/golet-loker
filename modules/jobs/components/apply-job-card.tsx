"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Handshake } from "lucide-react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { applyJob } from "@/actions/jobseeker";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApplyJobModal } from "@/components/elements/modals/apply-job-modal";
import { jobApplicationSchema } from "@/schemas/job";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ToastErrorOption,
  ToastSuccessOption,
} from "@/components/toast-option";
import { Spinner } from "@/components/ui/spinner";

interface ApplyJobCardProps {
  data: {
    id: string;
    jobTitle: string;
    employmentType: string;
    location: string;
    sallaryFrom: number | null;
    sallaryTo: number | null;
    jobDescription: string;
    listingDuration: number;
    benefits: string[];
    createdAt: Date;
    company: {
      location: string | null;
      name: string;
      about: string;
      logo: string;
    } | null;
  } | null;
  isApplied: boolean;
}

export const ApplyJobCard = ({ data, isApplied }: ApplyJobCardProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (error) {
      toast.error(error, ToastErrorOption);
    }
    if (success) {
      toast.success(success, ToastSuccessOption);
    }
  }, [error, success]);

  const form = useForm<z.infer<typeof jobApplicationSchema>>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      coverLetter: "",
      resume: "",
    },
  });

  const handleApply = async () => {
    try {
      startTransition(() => {
        applyJob(data?.id as string, form.getValues()).then((res) => {
          setError(res?.error);
          setSuccess(res?.success);
        });
      });
    } catch {
      toast.error("Terjadi kesalahan", ToastErrorOption);
    } finally {
      setOpen(false);
      setSuccess("");
      setError("");
    }
  };

  return (
    <>
      {open && (
        <ApplyJobModal
          isOpen={true}
          onClose={() => setOpen(false)}
          title={`Lamar ke ${data?.company?.name}`}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleApply)}>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          type="file"
                          accept="application/pdf"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Ukuran file maximal 5MB</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tulis Cover Letter</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          className="resize-none h-[200px]"
                          placeholder="Maximal 1000 karakter"
                          maxLength={1000}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {form.watch("coverLetter")?.length || 0}/1000
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-3 mt-3 w-full justify-end">
                <Button
                  variant={"outline"}
                  disabled={isPending}
                  onClick={() => setOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  className="bg-primary"
                  type="submit"
                  disabled={isPending}
                >
                  Lamar
                </Button>
              </div>
            </form>
          </Form>
        </ApplyJobModal>
      )}

      <Card>
        <div className="space-y-3">
          <CardHeader>
            <CardTitle className="font-semibold">Lamar Sekarang</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mt-1">
              Klik tombol di bawah untuk mengajukan lamaran
            </p>
          </CardContent>
          <CardFooter className="grid grid-cols-1">
            <Button
              size={"lg"}
              className="cursor-pointer w-full"
              onClick={() => setOpen(true)}
              disabled={isPending || isApplied}
            >
              {isPending ? (
                <Spinner />
              ) : (
                <>
                  {isApplied ? (
                    "Sudah Melamar"
                  ) : (
                    <>
                      <Handshake className="size-4" />
                      Lamar Mudah
                    </>
                  )}
                </>
              )}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
};
