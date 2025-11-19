import type { NavLink, NavbarCTA } from "../types/navbarData";
import { WHATSAPP_SUPPORT_URL } from "../utils/whatsapp";

export const navbarLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Feature", href: "/feature" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
  { name: "Blog", href: "/blogs", target: "_blank" },
  { name: "Employers", href: "/employers", target: "_blank" },
];

export const navbarCTAs: NavbarCTA = {
  primary: { label: "Get Me Interview →", href: WHATSAPP_SUPPORT_URL },
  secondary: { label: "See Flashfire in Action →", href: "#demo" },
};
