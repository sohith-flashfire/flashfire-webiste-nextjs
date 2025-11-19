import Footer from "@/src/components/footer/footer";
import HeroSection from "@/src/components/heroSection/heroSection";
import HomePageCareerCTA from "@/src/components/homePageCareerCTA/homePageCareerCTA";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";
import HomePageFoundersNote from "@/src/components/homePageFoundersNote/homePageFoundersNote";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import HomePageMilestones from "@/src/components/homePageMilestones/homePageMilestones";
import HomePageOfferLetters from "@/src/components/homePageOfferLetters/homePageOfferLetters";
import HomePagePricingPlans from "@/src/components/homePagePricingPlans/homePagePricingPlans";
import HomePagePTNote from "@/src/components/homePagePTNote/homePagePTNote";
import HomePageResultStats from "@/src/components/homePageResultStats/homePageResultStats";
import HomePageStatsCards from "@/src/components/homePageStatsCards/homePageStatsCards";
import HomePageSteps from "@/src/components/homePageSteps/homePageSteps";
import HomePageVideo from "@/src/components/homePageVideo/homePageVideo";
import HomePageWhyChooseFF from "@/src/components/homePageWhyChooseFF/homePageWhyChooseFF";
import Navbar from "@/src/components/navbar/navbar";
import SalesPopUp from "@/src/components/SalesPopUp";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection /> {/* using useState, so client */}
      <HomePageVideo />
      <HomePageResultStats />
      <HomePageStatsCards />
      <HomePageMilestones /> {/* using useState, so client */}
      <HomePageSteps />
      <HomePageOfferLetters /> {/* using useState, so client */}
      <HomePageWhyChooseFF /> {/* AJ section not so good */}
      <HomePageHappyUsers /> {/* pending */}
      <HomePagePTNote /> {/* PT section not so good */}
      <HomePagePricingPlans />
      <HomePageFAQ /> {/* using useState, so client */}
      <HomePageFoundersNote />
      <HomePageCareerCTA />
      <Footer />
      <SalesPopUp />
    </>
  );
};

export default Home;
