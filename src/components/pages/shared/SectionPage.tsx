"use client";

import { usePathname } from "next/navigation";
import HomePage from "../home/Home";
import CanadaHome from "../../countries/ca/Home";
import ScrollToSection from "@/src/utils/ui/scrollToSection";

interface SectionPageProps {
  sectionId: string;
}

export default function SectionPage({ sectionId }: SectionPageProps) {
  const pathname = usePathname();
  const isCanadaContext = pathname.startsWith("/en-ca");
  const HomeComponent = isCanadaContext ? CanadaHome : HomePage;

  return (
    <>
      <HomeComponent />
      <ScrollToSection targetId={sectionId} />
    </>
  );
}

