import EmployerForm from "@/src/components/employers/employerForm";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

interface LocaleEmployersPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleEmployersPage({ params }: LocaleEmployersPageProps) {
  await params; // Await params even if not used
  return (
    <>
      <Navbar />
      <EmployerForm />
      <Footer />
    </>
  );
}

