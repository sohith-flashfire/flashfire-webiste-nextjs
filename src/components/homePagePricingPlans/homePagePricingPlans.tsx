"use client";

import { usePathname } from "next/navigation";
import PricingCard from "./pricingCard";
import Image from "next/image";
import { usPricingPlans, canadaPricingPlans } from "@/src/data/pricingData";

export default function HomePagePricingPlans() {
  const pathname = usePathname();
  const isCanadaContext = pathname.startsWith("/en-ca");
  const pricingPlans = isCanadaContext ? canadaPricingPlans : usPricingPlans;

  return (
    <section
      id="pricing"
      className="bg-white py-16 px-8 font-['Space_Grotesk',sans-serif] text-center max-[768px]:py-4 max-[768px]:px-6"
    >
      <div className="mx-auto mb-12 max-[768px]:w-full max-[768px]:mb-8">
        <h2 className="text-[3rem] font-bold mb-4 text-black max-[1024px]:text-[2.4rem] max-[768px]:text-[2rem] max-[768px]:leading-[1.3] max-[480px]:text-[1.7rem]">
          Choose Your Career Acceleration Plan
        </h2>
        <p className="max-w-[35rem] mx-auto text-black text-[1.1rem] leading-[1.6] max-[1024px]:text-base max-[768px]:text-[0.95rem] max-[768px]:w-[90%] max-[480px]:text-[0.9rem]">
          All plans include our AI-powered job matching and application
          automation.
          <strong> Save 150+ hours monthly</strong> while we work for you 24/7.
        </p>
      </div>

      <div className="flex justify-center gap-6 flex-wrap mb-16 max-[1024px]:gap-5 max-[768px]:flex-col max-[768px]:items-center max-[768px]:gap-8">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            tag={plan.tag}
            subTitle={plan.subTitle}
            description={plan.description}
            price={plan.price}
            oldPrice={plan.oldPrice}
            features={plan.features}
            addOn={plan.addOn}
            highlight={plan.highlight}
            paymentLink={plan.paymentLink}
          />
        ))}
      </div>

      {/* === Risk-Free Section === */}
      <div className="bg-[rgba(251,240,235,1)] w-full w-[1280px] h-[161px]py-8 border border-[#ff4c00]  mt-8">
        <div className="bg-white  mt-2 ml-2 mr-2 mb-2 mx-auto flex justify-between items-center p-8 max-[1320px]:w-[95%] max-[768px]:flex-col max-[768px]:text-center max-[768px]:h-auto max-[768px]:gap-5 max-[768px]:p-6">
          {/* Left Section */}
          <div className="flex items-center gap-4 flex-1">
            {/* Pixel Art Mascot - on the left */}
            <div className="flex-shrink-0 relative w-32 h-32">
              <Image
                src="/images/right logo.png"
                alt="Flashfire Mascot"
                width={128}
                height={128}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-left">
              <h3 className="text-3xl font-bold mb-2 text-black max-[768px]:text-xl">
                100% Risk Free
              </h3>
              <p className="text-base text-black leading-relaxed font-bold max-[768px]:text-sm max-[480px]:text-xs">
                If you didn&rsquo;t land interviews, we&rsquo;ll send{" "}
                <span className="text-[#ff4c00] italic font-bold">
                  150-200 more applications,
                </span>{" "}
                <span className="text-[#ff4c00] italic font-bold">
                  free of charge.
                </span>
                <br />
                Because at Flashfire, you only pay for progress.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-0 flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-black leading-tight">
                Flashfire
              </span>
              <span className="text-3xl font-bold text-black leading-tight">
                Guarantee
              </span>
            </div>

            {/* Orange Checkmark in Starburst Icon - on the right */}
            <div className="flex-shrink-0 relative w-32 h-32 -ml-6">
              <Image
                src="/images/flashfire-logo.png"
                alt="Checkmark Badge"
                width={128}
                height={128}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
