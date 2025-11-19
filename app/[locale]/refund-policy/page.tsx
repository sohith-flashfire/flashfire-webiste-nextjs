import RefundPolicy from "@/src/components/legal/RefundPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

interface LocaleRefundPolicyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleRefundPolicyPage({ params }: LocaleRefundPolicyPageProps) {
  await params; // Await params even if not used
  return (
    <>
      <Navbar />
      <RefundPolicy />
      <Footer />
    </>
  );
}

