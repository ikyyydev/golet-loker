"use client";

import { useCallback } from "react";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { LocationSelect } from "@/components/ui/location-select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useDebouncedCallback } from "use-debounce";

const jobTypes = [
  "penuh-waktu",
  "paruh-waktu",
  "kontrak",
  "internship",
  "freelance",
];

export const JobFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // search
  const currentSearch = searchParams.get("search") || "";

  // Filter
  const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
  const currentLocation = searchParams.get("location") || "";

  const reset = () => {
    router.push("/jobs");
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = useDebouncedCallback((search: string) => {
    const trimed = search.trim();
    router.replace(`?${createQueryString("search", trimed)}`);
  }, 500);

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    const current = new Set(currentJobTypes);

    if (checked) {
      current.add(jobType);
    } else {
      current.delete(jobType);
    }

    const newValue = Array.from(current).join(",");

    router.push(`?${createQueryString("jobTypes", newValue)}`);
  };

  const handleLocationChange = (location: string) => {
    router.push(`?${createQueryString("location", location)}`);
  };

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-semibold">Filter</CardTitle>
        <Button className="h-8" variant={"link"} size={"sm"} onClick={reset}>
          Reset
        </Button>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Cari Posisi</Label>
            <InputGroup>
              <InputGroupInput
                placeholder="Cari posisi"
                defaultValue={currentSearch}
                onChange={(search) => handleSearch(search.target.value)}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Lokasi</Label>
            <LocationSelect
              value={currentLocation}
              onChange={(location) => handleLocationChange(location || "")}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-lg font-semibold">Tipe Pekerjaan</Label>
          <div className="grid grid-cols-2 gap-3">
            {jobTypes.map((job, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={job}
                  checked={currentJobTypes.includes(job)}
                  onCheckedChange={(checked) => {
                    handleJobTypeChange(job, checked as boolean);
                  }}
                />
                <Label className="text-sm font-medium">
                  {job.charAt(0).toUpperCase() + job.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
