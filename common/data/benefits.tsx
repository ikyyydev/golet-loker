import {
  HeartPulse,
  ShieldCheck,
  CalendarDays,
  CalendarCheck,
  Home,
  Clock,
  TrendingUp,
  GraduationCap,
  BookOpen,
  Stethoscope,
  Utensils,
  Bus,
  Wifi,
  Laptop,
  Timer,
  Gift,
  Tag,
  Users,
  Smile,
} from "lucide-react";

interface BenefitProps {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const benefits: BenefitProps[] = [
  {
    id: "health-insurance",
    label: "Asuransi Kesehatan",
    icon: <HeartPulse className="w-3 h-3" />,
  },
  {
    id: "employment-insurance",
    label: "BPJS Ketenagakerjaan",
    icon: <ShieldCheck className="w-3 h-3" />,
  },
  {
    id: "annual-leave",
    label: "Cuti Tahunan",
    icon: <CalendarDays className="w-3 h-3" />,
  },
  {
    id: "paid-leave",
    label: "Cuti Berbayar",
    icon: <CalendarCheck className="w-3 h-3" />,
  },
  {
    id: "work-from-home",
    label: "Work From Home",
    icon: <Home className="w-3 h-3" />,
  },
  {
    id: "flexible-working-hours",
    label: "Jam Kerja Fleksibel",
    icon: <Clock className="w-3 h-3" />,
  },
  {
    id: "performance-bonus",
    label: "Bonus Kinerja",
    icon: <TrendingUp className="w-3 h-3" />,
  },
  {
    id: "career-development",
    label: "Pengembangan Karier",
    icon: <GraduationCap className="w-3 h-3" />,
  },
  {
    id: "training-program",
    label: "Program Pelatihan",
    icon: <BookOpen className="w-3 h-3" />,
  },
  {
    id: "health-checkup",
    label: "Medical Check-Up",
    icon: <Stethoscope className="w-3 h-3" />,
  },
  {
    id: "meal-allowance",
    label: "Tunjangan Makan",
    icon: <Utensils className="w-3 h-3" />,
  },
  {
    id: "transport-allowance",
    label: "Tunjangan Transportasi",
    icon: <Bus className="w-3 h-3" />,
  },
  {
    id: "internet-allowance",
    label: "Tunjangan Internet",
    icon: <Wifi className="w-3 h-3" />,
  },
  {
    id: "equipment-support",
    label: "Fasilitas Kerja",
    icon: <Laptop className="w-3 h-3" />,
  },
  {
    id: "overtime-pay",
    label: "Uang Lembur",
    icon: <Timer className="w-3 h-3" />,
  },
  {
    id: "religious-holiday-allowance",
    label: "Tunjangan Hari Raya (THR)",
    icon: <Gift className="w-3 h-3" />,
  },
  {
    id: "employee-discount",
    label: "Diskon Karyawan",
    icon: <Tag className="w-3 h-3" />,
  },
  {
    id: "company-outing",
    label: "Company Outing",
    icon: <Users className="w-3 h-3" />,
  },
  {
    id: "wellness-program",
    label: "Program Kesejahteraan",
    icon: <Smile className="w-3 h-3" />,
  },
];
