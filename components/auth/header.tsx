import { cn } from "@/common/libs/utils";

type HeaderProps = {
  label: string;
};

type HeaderSectionProps = {
  title: string;
  description?: string;
  className?: string;
};

type HeaderDashboardProps = {
  title: string;
  description?: string;
  className?: string;
};

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-3">
      <h1 className="text-4xl font-bold">Selamat Datang!</h1>
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

export const HeaderDashboard = ({
  title,
  description,
  className,
}: HeaderDashboardProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className={cn("text-xl md:text-2xl text-white font-bold", className)}>
        {title}
      </h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
