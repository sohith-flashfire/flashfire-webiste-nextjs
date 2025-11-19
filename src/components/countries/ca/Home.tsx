"use client";

import { useEffect } from "react";
import HeroSection from "../../heroSection/heroSection";
import HomePageVideo from "../../homePageVideo/homePageVideo";
import HomePageResultStats from "../../homePageResultStats/homePageResultStats";
import HomePageMilestones from "../../homePageMilestones/homePageMilestones";
import HomePageSteps from "../../homePageSteps/homePageSteps";
import HomePageOfferLetters from "../../homePageOfferLetters/homePageOfferLetters";
import HomePageWhyChooseFF from "../../homePageWhyChooseFF/homePageWhyChooseFF";
import HomePageHappyUsers from "../../homePageHappyUsers/homePageHappyUsers";
import HomePagePTNote from "../../homePagePTNote/homePagePTNote";
import HomePagePricingPlans from "../../homePagePricingPlans/homePagePricingPlans";
import HomePageFAQ from "../../homePageFAQ/homePageFAQ";
import HomePageFoundersNote from "../../homePageFoundersNote/homePageFoundersNote";
import HomePageCareerCTA from "../../homePageCareerCTA/homePageCareerCTA";
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import { usePathname } from "next/navigation";

export default function CanadaHome() {
  const pathname = usePathname();

  useEffect(() => {
    // Track Canada-specific page view
    console.log("🇨🇦 Canada Home page view:", pathname);
    // Add PostHog tracking here if needed
  }, [pathname]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <HomePageVideo />
      <HomePageResultStats />
      <HomePageMilestones />
      <HomePageSteps />
      <HomePageOfferLetters />
      <HomePageWhyChooseFF />
      <HomePageHappyUsers />
      <HomePagePTNote />
      <HomePagePricingPlans />
      <HomePageFAQ />
      <HomePageFoundersNote />
      <HomePageCareerCTA />
      <Footer />
    </>
  );
}

