"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./homePageFAQ.module.css";
import { FaPlus, FaTimes } from "react-icons/fa";
import { questionsData } from "@/src/data/questionsData";
import Image from "next/image";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { getCurrentUTMParams } from "@/src/utils/UTMUtils";

export default function HomePageFAQClient() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <div className={styles.header}>
        <h2>Question? We Got You Answers.</h2>
        <p>
          We get it, AI job search can sound complex. Here’s everything
          explained, plain and simple.
        </p>
      </div>

      <div className={styles.faqContainer}>
        {questionsData.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${
              activeIndex === index ? styles.active : ""
            }`}
          >
            <button
              className={styles.faqQuestion}
              onClick={() => {
                handleToggle(index);
                trackButtonClick(`FAQ ${index + 1}`, "faq_item", "link", {
                  button_location: "faq_section",
                  faq_question: faq.question,
                  faq_index: index + 1
                });
              }}
            >
              <span>{faq.question}</span>
              <span className={styles.icon}>
                {activeIndex === index ? <FaTimes /> : <FaPlus />}
              </span>
            </button>

            {activeIndex === index && (
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* === Book a Demo CTA === */}
      <div className={styles.demoSectionOuter}>
        <div className={`${styles.demoSection} bg-[rgba(245,93,29,1)]`}>
          <h5 className={styles.demoSubheading}>
            GOT FURTHER QUESTIONS? LET&rsquo;S TALK!
          </h5>

          <h2 
            className={styles.demoHeading}
            onClick={() => {
              const utmSource = typeof window !== "undefined" 
                ? localStorage.getItem("utm_source") || "WEBSITE"
                : "WEBSITE";
              const utmMedium = typeof window !== "undefined"
                ? localStorage.getItem("utm_medium") || "FAQ_Demo_Section"
                : "FAQ_Demo_Section";
              
              GTagUTM({
                eventName: "sign_up_click",
                label: "FAQ_Demo_Heading_Button",
                utmParams: {
                  utm_source: utmSource,
                  utm_medium: utmMedium,
                  utm_campaign: typeof window !== "undefined"
                    ? localStorage.getItem("utm_campaign") || "Website"
                    : "Website",
                },
              });
              
              trackButtonClick("BOOK A DEMO CALL", "faq_demo_cta", "cta", {
                button_location: "faq_demo_heading",
                section: "faq",
                target_url: "/book-my-demo-call"
              });
              trackSignupIntent("faq_demo_cta", {
                signup_source: "faq_demo_heading",
                funnel_stage: "signup_intent",
                target_url: "/book-my-demo-call"
              });
              
              // Navigate to /book-my-demo-call with preserved UTM params
              const utmParams = getCurrentUTMParams();
              const targetPath = utmParams ? `/book-my-demo-call?${utmParams}` : '/book-my-demo-call';
              
              // Dispatch custom event to force show modal (even if already on the route)
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('showGetMeInterviewModal'));
              }
              
              router.push(targetPath);
            }}
            style={{ cursor: "pointer" }}
          >
            BOOK A DEMO{" "}
            <span
              className={`${styles.fireIcon} inline-flex items-center -mx-4 `}
            >
              <Image
                src="/images/character.png"
                alt="Flashfire mascot"
                width={96}
                height={96}
                className="w-20 h-20  left-1 max-[600px]:w-16 max-[600px]:h-16"
              />
            </span>{" "}
            CALL
          </h2>

          <p className={styles.demoText}>
            We get it, <em>finding the right job isn&apos;t easy.</em> Book a quick
            chat with our founder and see how Flashfire can help you land
            interviews faster.
          </p>

          <button 
            className={styles.demoButton}
            onClick={() => {
              const utmSource = typeof window !== "undefined" 
                ? localStorage.getItem("utm_source") || "WEBSITE"
                : "WEBSITE";
              const utmMedium = typeof window !== "undefined"
                ? localStorage.getItem("utm_medium") || "FAQ_Demo_Section"
                : "FAQ_Demo_Section";
              
              GTagUTM({
                eventName: "sign_up_click",
                label: "FAQ_Demo_Button",
                utmParams: {
                  utm_source: utmSource,
                  utm_medium: utmMedium,
                  utm_campaign: typeof window !== "undefined"
                    ? localStorage.getItem("utm_campaign") || "Website"
                    : "Website",
                },
              });
              
              trackButtonClick("Book My Demo Call", "faq_demo_cta", "cta", {
                button_location: "faq_demo_button",
                section: "faq",
                target_url: "/book-my-demo-call"
              });
              trackSignupIntent("faq_demo_cta", {
                signup_source: "faq_demo_button",
                funnel_stage: "signup_intent",
                target_url: "/book-my-demo-call"
              });
              
              // Navigate to /book-my-demo-call with preserved UTM params
              const utmParams = getCurrentUTMParams();
              const targetPath = utmParams ? `/book-my-demo-call?${utmParams}` : '/book-my-demo-call';
              
              // Dispatch custom event to force show modal (even if already on the route)
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('showGetMeInterviewModal'));
              }
              
              router.push(targetPath);
            }}
          >
            Book My Demo Call →
          </button>

          <p className={styles.demoNote}>
            Limited slots available. Book your call now!
          </p>
        </div>
      </div>
    </section>
  );
}
