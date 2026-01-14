import { cn } from "@/common/libs/utils";

type HeaderProps = {
  label: string;
};

type HeaderSectionProps = {
  title: string;
  description?: string;
  className?: string;
};

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-3">
      <h1 className="text-4xl font-bold text-black dark:text-white">
        Selamat Datang!
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export const HeaderSection = ({
  title,
  description,
  className,
}: HeaderSectionProps) => {
  return (
    <div className={cn("w-full flex flex-col gap-y-3 text-center", className)}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};
