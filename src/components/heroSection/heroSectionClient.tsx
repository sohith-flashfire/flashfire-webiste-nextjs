"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./heroSection.module.css";
import { HeroSectionData } from "@/src/types/heroSectionData";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { getCurrentUTMParams } from "@/src/utils/UTMUtils";

type Props = {
  data: HeroSectionData;
};

export default function HeroSectionClient({ data }: Props) {
  const router = useRouter();

  return (
    <section className={styles.heroContainer}>
      {/* === Top Badges === */}
      <div className={styles.heroBadges}>
        {data.badges.map((badge) => (
          <span key={badge} className={styles.heroBadgeItem}>
            {badge}
          </span>
        ))}
      </div>

      {/* === Headline === */}
      <h1 className={styles.heroHeadline}>
        <span className={styles.heroHeadlineText}>{data.headlineMain}</span>
        <span className={styles.heroHeadlineText}>
          <span className={styles.heroHighlight}>{data.headlineHighlight}</span>
          <Image
            src="/images/flashfire-logo.png"
            alt="Flashfire Logo"
            width={60}
            height={60}
            className={styles.heroLogo}
          />
          <span className={styles.heroHighlight}>{data.headlineSuffix}</span>
        </span>
      </h1>

      {/* === Description === */}
      <p className={styles.heroDescription}>{data.description}</p>

      {/* === CTA Button === */}
      <button
        onClick={() => {
          const utmSource = typeof window !== "undefined"
            ? localStorage.getItem("utm_source") || "WEBSITE"
            : "WEBSITE";
          const utmMedium = typeof window !== "undefined"
            ? localStorage.getItem("utm_medium") || "Website_Front_Page"
            : "Website_Front_Page";

          GTagUTM({
            eventName: "sign_up_click",
            label: "Hero_Start_Free_Trial_Button",
            utmParams: {
              utm_source: utmSource,
              utm_medium: utmMedium,
              utm_campaign: typeof window !== "undefined"
                ? localStorage.getItem("utm_campaign") || "Website"
                : "Website",
            },
          });

          // PostHog tracking
          trackButtonClick("Get me interview", "hero_cta", "cta", {
            button_location: "hero_main_cta",
            section: "hero_landing"
          });
          trackSignupIntent("hero_cta", {
            signup_source: "hero_main_button",
            funnel_stage: "signup_intent"
          });

          // Navigate to /get-me-interview with preserved UTM params
          const utmParams = getCurrentUTMParams();
          const targetPath = utmParams ? `/get-me-interview?${utmParams}` : '/get-me-interview';
          
          // Dispatch custom event to force show modal (even if already on the route)
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('showGetMeInterviewModal'));
          }
          
          router.push(targetPath);
        }}
        className={styles.heroCTAButton}
      >
        {data.cta.label}
      </button>

      {/* === Trusted Users === */}
      <div className={styles.heroUserTrust}>
        <div className={styles.heroUserIcons}>
          {["user1.jpg", "user2.jpg", "user3.jpg"].map((img, i) => (
            <div key={i} className={styles.heroUserCircleWrapper}>
              <Image
                src={`/images/${img}`}
                alt={`User ${i + 1}`}
                fill
                sizes="2.2rem"
                className={styles.heroUserCircle}
              />
            </div>
          ))}
        </div>
        <p className={styles.heroUserText}>{data.trustText}</p>
      </div>

      {/* === Universities Section === */}
      <div className={styles.heroUniversityContainer}>
        {/* Heading in separate box */}
        <div className={styles.heroUniversityHeadingBox}>
          <p className={styles.heroUniversityHeading}>{data.universityHeading}</p>
        </div>

        {/* University logos below */}
        <div className={styles.heroUniversityWrapper}>
          <div className={styles.heroUniversityStrip}>
            {data.universities.map((uni, index) => (
              <div key={index} className={styles.heroUniversityCard}>
                <Image
                  src={`https://logo.clearbit.com/${uni.domain}`}
                  alt={uni.name}
                  width={60}
                  height={40}
                  className={styles.universityLogo}
                />
                <p className={styles.heroUniversityStripUniName}>{uni.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
