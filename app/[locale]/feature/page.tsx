import SectionPage from "@/src/components/pages/shared/SectionPage";

interface LocaleFeaturePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleFeaturePage({ params }: LocaleFeaturePageProps) {
  await params; // Await params even if not used
  return <SectionPage sectionId="feature" />;
}

