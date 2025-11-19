import { navbarCTAs, navbarLinks } from "@/src/data/navbar";
import NavbarClient from "./navbarClient";

export default function Navbar() {
  return <NavbarClient links={navbarLinks} ctas={navbarCTAs} />;
}
