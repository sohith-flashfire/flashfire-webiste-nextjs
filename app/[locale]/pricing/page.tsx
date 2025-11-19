import SectionPage from "@/src/components/pages/shared/SectionPage";

interface LocalePricingPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocalePricingPage({ params }: LocalePricingPageProps) {
  await params; // Await params even if not used
  return <SectionPage sectionId="pricing" />;
}

