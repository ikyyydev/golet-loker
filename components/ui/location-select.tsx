"use client";

import { useMemo, useState, useTransition } from "react";
import { useDebounce } from "use-debounce";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/common/libs/utils";
import { getIndonesiaLocations } from "@/common/data/indonesia-location";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface LocationSelectProps {
  value?: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  isTransparent?: boolean;
}

export const LocationSelect = ({
  value,
  onChange,
  placeholder = "Pilih Lokasi",
  disabled,
  className,
  isTransparent = false,
}: LocationSelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debounceQuery] = useDebounce(query, 200);
  const [isPending, startTransition] = useTransition();

  const locations = useMemo(() => {
    return getIndonesiaLocations().map((l) => ({
      ...l,
      searchString: `${l.city} ${l.province}`.toLowerCase(),
    }));
  }, []);

  const filtered = useMemo(() => {
    const term = debounceQuery.toLowerCase().trim();
    if (term.length < 2) return [];

    const results = [];
    for (const loc of locations) {
      if (loc.searchString.includes(term)) {
        results.push(loc);
      }
      if (results.length >= 50) break;
    }
    return results;
  }, [debounceQuery, locations]);

  const isSearching =
    isPending || (query !== debounceQuery && query.length >= 2);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={isTransparent ? "default" : "outline"}
          role="combobox"
          className={cn(
            "w-full flex justify-between font-normal bg-transparent",
            !value && "text-muted-foreground",
            isTransparent && "hover:bg-input/10",
            className
          )}
        >
          <span
            className={`${
              isTransparent ? "text-white" : "text-muted-foreground"
            } line-clamp-1`}
          >
            {value || placeholder}
          </span>
          <ChevronsUpDown
            className={`${
              isTransparent ? "text-white" : ""
            } ml-2 h-4 w-4 opacity-50`}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-inherit p-0">
        <Command>
          <CommandInput
            placeholder="Cari lokasi..."
            onValueChange={(val) => startTransition(() => setQuery(val))}
          />

          <CommandList>
            {isSearching && (
              <div className="p-4 text-sm text-muted-foreground text-center">
                Loading...
              </div>
            )}

            {!isSearching && !query && (
              <div className="p-4 text-sm text-muted-foreground text-center">
                Ketik untuk mencari lokasi
              </div>
            )}

            {!isSearching && query && filtered.length === 0 && (
              <CommandEmpty>Lokasi tidak ditemukan.</CommandEmpty>
            )}

            {!isSearching && (
              <CommandGroup>
                {filtered.map((loc) => (
                  <CommandItem
                    key={loc.key}
                    value={loc.label}
                    onSelect={() => {
                      onChange(loc.value);
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        loc.value === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {loc.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
