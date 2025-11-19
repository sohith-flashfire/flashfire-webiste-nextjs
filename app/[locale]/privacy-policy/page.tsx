import PrivacyPolicy from "@/src/components/legal/PrivacyPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

interface LocalePrivacyPolicyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocalePrivacyPolicyPage({ params }: LocalePrivacyPolicyPageProps) {
  await params; // Await params even if not used
  return (
    <>
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </>
  );
}

