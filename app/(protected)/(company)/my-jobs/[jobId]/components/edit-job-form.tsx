/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "@/schemas/job";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LocationInput } from "@/components/ui/location-input";
import { SallaryInput } from "@/components/ui/sallary-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JobDescriptionEditor } from "@/components/ui/job-description-editor";
import { BenefitInput } from "@/components/ui/benefit-input";
import { ImageUpload } from "@/components/ui/image-upload";
import { Textarea } from "@/components/ui/textarea";
import { JobDurationInput } from "@/components/ui/job-duration-input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ToastErrorOption,
  ToastSuccessOption,
} from "@/components/toast-option";
import { editJob } from "@/actions/company";

interface EditJobFormProps {
  jobPost: {
    jobTitle: string;
    jobDescription: string;
    employmentType: string;
    location: string;
    sallaryFrom: number | null;
    sallaryTo: number | null;
    listingDuration: number;
    benefits: string[];
    id: string;
    company: {
      location: string | null;
      name: string;
      about: string;
      logo: string;
      website: string;
    } | null;
  };
}

const EditJobForm: React.FC<EditJobFormProps> = ({ jobPost }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openSallary, setOpenSallary] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    shouldUnregister: true,
    defaultValues: {
      benefits: jobPost.benefits,
      companyName: jobPost.company?.name,
      companyAbout: jobPost.company?.about,
      companyLogo: jobPost.company?.logo,
      companyLocation: jobPost.company?.location || "",
      companyWebsite: jobPost.company?.website,
      employmentType: jobPost.employmentType,
      jobTitle: jobPost.jobTitle,
      jobDescription: jobPost.jobDescription,
      listingDuration: jobPost.listingDuration,
      location: jobPost.location,
    },
  });

  const onSubmit = async (values: z.infer<typeof jobSchema>) => {
    try {
      setLoading(true);
      await editJob(values, jobPost.id);
      router.refresh();
      toast.success("Lowongan berhasil di edit", ToastSuccessOption);
      router.push("/my-jobs");
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="col-span-1 lg:col-span-2 flex flex-col gap-y-5"
      >
        <Card>
          <CardHeader>
            <CardTitle>Informasi Lowongan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Posisi *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="cth: Software Engineer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Pekerjaan *</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih tipe pekerjaan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipe Pekerjaan</SelectLabel>
                          <SelectItem value="penuh-waktu">
                            Penuh Waktu
                          </SelectItem>
                          <SelectItem value="paruh-time">Paruh Time</SelectItem>
                          <SelectItem value="kontrak">Kontrak</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <LocationInput
                control={form.control}
                label="Lokasi *"
                name="location"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1">
              <FormItem className="space-y-3">
                {openSallary && (
                  <>
                    <FormLabel>Gaji</FormLabel>
                    <FormControl>
                      <SallaryInput
                        control={form.control}
                        minSallary={0}
                        maxSallary={50000000}
                        step={500000}
                      />
                    </FormControl>
                    <FormDescription>
                      Matikan centang untuk merahasiakan gaji
                    </FormDescription>
                  </>
                )}
                <Label className="w-full flex gap-2">
                  <Checkbox
                    checked={openSallary}
                    onCheckedChange={(checked) => {
                      setOpenSallary(!!checked);
                    }}
                  />
                  <p className="text-sm leading-none font-medium">
                    Tampilkan Gaji
                  </p>
                </Label>
              </FormItem>
            </div>

            <FormField
              disabled={loading}
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Pekerjaan *</FormLabel>
                  <FormControl>
                    <JobDescriptionEditor field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefit *</FormLabel>
                  <FormControl>
                    <BenefitInput field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={loading}
              name="listingDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durasi Lowongan *</FormLabel>
                  <FormControl>
                    <JobDurationInput field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informasi Perusahaan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <FormField
                control={form.control}
                name="companyLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo *</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                        label="logo"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Perusahaan *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="cth: PT Abadi Jaya"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <LocationInput
                control={form.control}
                label="Lokasi *"
                name="companyLocation"
                disabled={loading}
              />
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="cth: https://abadijaya.com"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-5">
              <FormField
                control={form.control}
                name="companyAbout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tentang Perusahaan *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tuliskan detail informasi perusahan anda"
                        className="h-[150px] resize-none overflow-auto"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Button
          disabled={loading}
          type="submit"
          className="w-full cursor-pointer"
        >
          {loading ? <Spinner /> : "Simpan Perubahan"}
        </Button>
      </form>
    </Form>
  );
};

export default EditJobForm;
