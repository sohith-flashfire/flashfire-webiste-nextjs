import SectionPage from "@/src/components/pages/shared/SectionPage";

interface LocaleTestimonialsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleTestimonialsPage({ params }: LocaleTestimonialsPageProps) {
  await params; // Await params even if not used
  return <SectionPage sectionId="testimonials" />;
}

