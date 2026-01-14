import { Building2, User2 } from "lucide-react";

type UserSelectionType = "company" | "jobSeeker";

interface UserTypeSelectionProps {
  onSelect: (type: UserSelectionType) => void;
}

const UserTypeSelection = ({ onSelect }: UserTypeSelectionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Pilih Peran Kamu</h2>
        <p className="text-muted-foreground">
          Pilih peran kamu agar kami dapat menyesuaikan pengalaman kamu di
          platform ini.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div
          onClick={() => onSelect("company")}
          className="w-full h-auto flex p-6 items-center justify-baseline gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5 cursor-pointer rounded-md"
        >
          <div className="size-12 p-3 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="size-6 text-primary" />
          </div>

          <div className="text-left">
            <h3 className="font-semibold text-lg">Sebagai Perusahaan</h3>
            <p className="text-muted-foreground text-sm">
              Pasang lowongan pekerjaan, kelola kandidat, dan temukan talenta
              terbaik yang sesuai dengan kebutuhan perusahaan.
            </p>
          </div>
        </div>

        <div
          onClick={() => onSelect("jobSeeker")}
          className="w-full h-auto flex p-6 items-center justify-baseline gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5 cursor-pointer rounded-md"
        >
          <div className="size-12 p-3 rounded-full bg-primary/10 flex items-center justify-center">
            <User2 className="size-6 text-primary" />
          </div>

          <div className="text-left">
            <h3 className="font-semibold text-lg">Sebagai Kandidat</h3>
            <p className="text-muted-foreground text-sm">
              Temukan lowongan kerja yang sesuai, bangun profil profesional, dan
              lamar pekerjaan dengan mudah.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
