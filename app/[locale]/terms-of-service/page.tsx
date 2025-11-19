import TermsOfService from "@/src/components/legal/TermsOfService";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

interface LocaleTermsOfServicePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleTermsOfServicePage({ params }: LocaleTermsOfServicePageProps) {
  await params; // Await params even if not used
  return (
    <>
      <Navbar />
      <TermsOfService />
      <Footer />
    </>
  );
}

