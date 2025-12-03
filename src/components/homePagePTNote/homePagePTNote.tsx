"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { trackButtonClick, trackExternalLink } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import FlashfireLogo from "@/src/components/FlashfireLogo";

export default function HomePagePTNote() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "919817349846";
    const message = encodeURIComponent(
      "Hi! I\u2019m interested in Flashfire\u2019s AI-powered job search automation. Can you help me get started?",
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    const utmSource = typeof window !== "undefined"
      ? localStorage.getItem("utm_source") || "WEBSITE"
      : "WEBSITE";
    const utmMedium = typeof window !== "undefined"
      ? localStorage.getItem("utm_medium") || "PT_Note_WhatsApp_Section"
      : "PT_Note_WhatsApp_Section";
    
    // GTag tracking
    GTagUTM({
      eventName: "whatsapp_support_click",
      label: "PT_Note_WhatsApp_Button",
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: typeof window !== "undefined"
          ? localStorage.getItem("utm_campaign") || "Website"
          : "Website",
      },
    });
    
    // PostHog tracking (automatically includes UTM via getUTMContext)
    trackButtonClick("Connect on WhatsApp", "pt_note_section", "cta", {
      button_location: "pt_note_whatsapp",
      section: "pt_note"
    });
    trackExternalLink(whatsappUrl, "Connect on WhatsApp", "pt_note_section", {
      link_type: "whatsapp_support",
      contact_method: "whatsapp"
    });
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="bg-white font-['Space_Grotesk',sans-serif] py-16 px-8">
      <div className="bg-[#fff6f4] flex justify-between items-stretch gap-8 p-4 mx-auto w-[1280px] h-[302px]">
        {/* === LEFT: Quote Card === */}
        <div className="relative bg-black text-white w-[60%] p-8 flex flex-col justify-between overflow-hidden">
          <div className="pr-[240px]">
            <p className="text-[0.9rem] font-semibold text-[#94959a] mb-6">
              HELPING 100+ JOB SEEKERS
            </p>

            <blockquote className="text-2xl md:text-3xl italic leading-tight font-semibold text-white mb-6">
              &quot;Every line of code we
              <br />
              write is to help someone
              <br />
              hear back - finally.&quot;
            </blockquote>
          </div>

          <div className="flex justify-start items-center pr-[240px]">
            <div className="flex flex-col mr-5">
              <p className="text-base font-semibold text-white">
                Pranjal Tripathi
              </p>
              <p className="text-[0.8rem] text-[#aaa]">CTO </p>
            </div>
            <p className="text-[1.8rem] text-white mx-4">|</p>
            <div>
              <FlashfireLogo
                variant="white"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <div className="text-white font-semibold ml-2">Flashfire</div>
          </div>

          <div className="absolute bottom-0 right-6 overflow-hidden">
            <Image
              src="/images/pranjal_cto.png"
              alt="Pranjal Tripathi"
              width={220}
              height={220}
              className="w-[220px] h-[220px] object-cover block [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
            />
          </div>
        </div>

        {/* === RIGHT: WhatsApp CTA === */}
        <div className="relative bg-white w-[40%]  p-10 border border-[#f1ddd3] flex flex-col justify-center text-left overflow-hidden">
          <h3 className="text-[1.4rem] font-bold text-[#111] mb-2.5 leading-[1.4]">
            Not sure where to start? <br />
            Let&rsquo;s talk.
          </h3>
          <p className="text-[#333] text-[0.95rem] mb-6">
            Message us on WhatsApp and we&rsquo;ll guide you step-by-step.
          </p>

          <button
            onClick={handleWhatsAppClick}
            className="w-fit bg-[#ff4c00] text-white border-0 border-b-[5px] border-b-black py-[0.9rem] px-[1.6rem] font-semibold text-base rounded-[0.4rem] cursor-pointer inline-flex items-center gap-2 transition-all hover:bg-[#e64400] hover:border-b-[5px] hover:border-b-black hover:scale-105"
          >
            <FaWhatsapp className="text-[1.2rem]" />
            Connect on WhatsApp
          </button>

          <div className="absolute bottom-0 right-0 translate-x-1/2 text-[20rem] opacity-[0.06] text-[#ff4c00] pointer-events-none">
            <FaWhatsapp />
          </div>
        </div>
      </div>
    </section>
  );
}
