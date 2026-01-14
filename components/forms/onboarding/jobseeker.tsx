"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { jobSeekerSchema } from "@/schemas/onboarding";

import { createJobSeeker } from "@/actions/jobseeker";
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
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { ToastErrorOption } from "@/components/toast-option";

export const JobSeekerForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      name: "",
      about: "",
      resume: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof jobSeekerSchema>) => {
    try {
      setLoading(true);
      await createJobSeeker(data);
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        toast.error("Terjadi kesalahan", ToastErrorOption);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="eg. John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    maxLength={5000}
                    className="resize-none h-24 overflow-y-auto"
                    placeholder="Tell us about yourself"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Max 3000 characters</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume (PDF)</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="file"
                    accept="application/pdf"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Maximum file size: 5MB</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <Spinner /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
