import { heroSectionData } from "@/src/data/herosection";
import HeroSectionClient from "./heroSectionClient";

export default function HeroSection() {
  return <HeroSectionClient data={heroSectionData} />;
}
