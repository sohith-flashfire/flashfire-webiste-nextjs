import SectionPage from "@/src/components/pages/shared/SectionPage";

interface LocaleFAQPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleFAQPage({ params }: LocaleFAQPageProps) {
  await params; // Await params even if not used
  return <SectionPage sectionId="faq" />;
}

