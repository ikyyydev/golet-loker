"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LocationSelect } from "@/components/ui/location-select";
import { useRouter } from "next/navigation";
import { cn } from "@/common/libs/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { searchSchema } from "@/schemas/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";

/* eslint-disable @typescript-eslint/no-unused-vars */
const SearchBar = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
      location: "",
    },
  });

  const onSubmit = (values: z.infer<typeof searchSchema>) => {
    setLoading(true);
    const params = new URLSearchParams();

    if (values.search) params.set("search", values.search);
    if (values.location) params.set("location", values.location);

    router.replace(`/jobs?${params.toString()}`);

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "grid grid-cols-5 p-1 border border-muted-foreground rounded-lg",
          className
        )}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <InputGroup className="col-span-2 border-0 bg-transparent dark:bg-transparent">
                <InputGroupInput
                  placeholder="Cari posisi"
                  {...field}
                  className="placeholder:text-white"
                />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <LocationSelect
                value={field.value}
                onChange={field.onChange}
                className="border-0"
                isTransparent
              />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          size={"sm"}
          className="my-auto"
        >
          {loading ? "Mencari..." : "Cari"}
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
