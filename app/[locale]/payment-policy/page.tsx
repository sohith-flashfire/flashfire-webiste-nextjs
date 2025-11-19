import PaymentPolicy from "@/src/components/legal/PaymentPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

interface LocalePaymentPolicyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocalePaymentPolicyPage({ params }: LocalePaymentPolicyPageProps) {
  await params; // Await params even if not used
  return (
    <>
      <Navbar />
      <PaymentPolicy />
      <Footer />
    </>
  );
}

