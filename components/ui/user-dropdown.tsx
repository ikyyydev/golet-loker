import {
  Bookmark,
  ChevronDown,
  ListCheckIcon,
  LucideLogOut,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "@/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserDropdownProps {
  name: string;
  email: string;
  image: string;
}

export const UserDropdown = ({ name, email, image }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="h-auto p-0 hover:bg-transparent focus-visible:border-none focus-visible:ring-0 dark:hover:bg-transparent cursor-pointer"
        >
          <Avatar>
            <AvatarImage src={image} alt="Profile Image" />
            <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <ChevronDown size={16} strokeWidth={2} className="ml-1 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-xs text-muted-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/saved-job"}>
              <Bookmark size={16} strokeWidth={2} className="opacity-60" />
              Disimpan
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/my-jobs"}>
              <ListCheckIcon size={16} strokeWidth={2} className="opacity-60" />
              Lowongan Saya
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-red-500 group" asChild>
          <form
            action={async () => {
              "use server";

              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="flex w-full items-center gap-2">
              <LucideLogOut
                size={16}
                strokeWidth={2}
                className="opacity-60 group-focus:text-white"
              />
              <span>Keluar</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
