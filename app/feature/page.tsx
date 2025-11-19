import HomePage from "@/src/components/pages/home/Home";
import ScrollToSection from "@/src/utils/ui/scrollToSection";

export default function FeaturePage() {
  return (
    <>
      <HomePage />
      <ScrollToSection targetId="feature" />
    </>
  );
}

