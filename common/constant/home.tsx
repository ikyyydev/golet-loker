import { JSX } from "react";
import { StaticImageData } from "next/image";

import { PiBagBold, PiBuildingApartmentFill } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { CiBank } from "react-icons/ci";
import { AiFillShop } from "react-icons/ai";
import { MdOutlineAnalytics } from "react-icons/md";

import LogoPertamina from "@/public/img/pertamina.png";
import LogoTelkom from "@/public/img/telkom.png";
import LogoSharp from "@/public/img/sharp-logo.jpg";
import LogoPama from "@/public/img/pama-logo.jpg";
import LogoAstra from "@/public/img/astra-logo.jpg";
import LogoAHM from "@/public/img/ahm-logo.jpg";
import LogoPanasonic from "@/public/img/panasonic.jpg";
import LogoDaikin from "@/public/img/daikin-logo.jpg";
import LogoHyundai from "@/public/img/hyundai-logo.jpg";
import LogoToyota from "@/public/img/toyota-logo.jpg";
import LogoGaruda from "@/public/img/garuda-indo-logo.jpg";

type StatisticsProps = {
  icon: JSX.Element;
  value: string;
  label: string;
};

type JobCategoriesProps = {
  icon: JSX.Element;
  label: string;
};

type CompaniesProps = {
  id: number;
  url: StaticImageData;
};

export const statistics: StatisticsProps[] = [
  {
    icon: <PiBagBold />,
    value: "50000+",
    label: "Lowongan Tersedia",
  },
  {
    icon: <PiBuildingApartmentFill />,
    value: "1000+",
    label: "Perusahaan",
  },
  {
    icon: <IoIosPeople />,
    value: "1000000+",
    label: "Kandidat Terdaftar",
  },
  {
    icon: <PiBagBold />,
    value: "500+",
    label: "Lowongan Baru",
  },
];

export const jobCategories: JobCategoriesProps[] = [
  {
    icon: <CiBank />,
    label: "Bank",
  },
  {
    icon: <AiFillShop />,
    label: "Sales",
  },
  {
    icon: <MdOutlineAnalytics />,
    label: "Digital Marketing",
  },
  {
    icon: <MdOutlineAnalytics />,
    label: "IT",
  },
  {
    icon: <MdOutlineAnalytics />,
    label: "Human Resource",
  },
  {
    icon: <MdOutlineAnalytics />,
    label: "Pertanian",
  },
];

export const companies: CompaniesProps[] = [
  {
    id: 1,
    url: LogoPertamina,
  },
  {
    id: 2,
    url: LogoTelkom,
  },
  {
    id: 3,
    url: LogoSharp,
  },
  {
    id: 4,
    url: LogoPama,
  },
  {
    id: 5,
    url: LogoDaikin,
  },
  {
    id: 6,
    url: LogoToyota,
  },
  {
    id: 7,
    url: LogoHyundai,
  },
  {
    id: 8,
    url: LogoAstra,
  },
  {
    id: 9,
    url: LogoAHM,
  },
  {
    id: 10,
    url: LogoPanasonic,
  },
  {
    id: 11,
    url: LogoTelkom,
  },
  {
    id: 12,
    url: LogoGaruda,
  },
];
