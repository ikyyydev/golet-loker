"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { companySchema } from "@/schemas/onboarding";

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
import { ImageUpload } from "@/components/ui/image-upload";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createCompany } from "@/actions/company";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { ToastErrorOption } from "@/components/toast-option";

export const CompanyForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      about: "",
      logo: "",
      website: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof companySchema>) => {
    try {
      setLoading(true);
      await createCompany(data);
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
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    label="Upload logo"
                  />
                </FormControl>
                <FormDescription>Max size: 2MB</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="eg. PT Abadi Jaya"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="eg. https://example.com"
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
                    placeholder="Tell us about your company"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Max 5000 characters</FormDescription>
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
