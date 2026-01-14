import { JSX } from "react";

import { BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

interface SocialFooterProps {
  icon: JSX.Element;
  label: string;
  url: string;
}

export interface FooterMenu {
  label: string;
  url: string;
}

export const socialsFooter: SocialFooterProps[] = [
  {
    icon: <BsInstagram />,
    label: "Instagram",
    url: "https://www.instagram.com/goletloker/",
  },
  {
    icon: <BsTwitterX />,
    label: "X Twitter",
    url: "https://twitter.com/goletloker",
  },
  {
    icon: <FaFacebook />,
    label: "Facebook",
    url: "https://www.facebook.com/goletloker/",
  },
  {
    icon: <BsLinkedin />,
    label: "Linkedin",
    url: "https://www.linkedin.com/in/goletloker",
  },
];

export const quickMenu: FooterMenu[] = [
  {
    label: "Beranda",
    url: "/",
  },
  {
    label: "Lowongan",
    url: "/jobs",
  },
  {
    label: "Perusahaan",
    url: "/companies",
  },
  {
    label: "Artikel",
    url: "/articles",
  },
];

export const accountMenu: FooterMenu[] = [
  {
    label: "Masuk",
    url: "/auth/login",
  },
  {
    label: "Daftar",
    url: "/auth/register",
  },
  {
    label: "Lupa Sandi",
    url: "/auth/reset-password",
  },
];

export const aboutMenu: FooterMenu[] = [
  {
    label: "Tentang Kami",
    url: "/about",
  },
  {
    label: "Syarat dan Ketentuan",
    url: "/term-conditions",
  },
  {
    label: "Kebijakan Privasi",
    url: "/privacy-policy",
  },
  {
    label: "Umpan Balik",
    url: "/feedback",
  },
  {
    label: "Kontak",
    url: "/contact",
  },
];
