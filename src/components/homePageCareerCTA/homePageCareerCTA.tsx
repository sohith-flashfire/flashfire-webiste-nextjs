"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./homePageCareerCTA.module.css";
import { FaBolt } from "react-icons/fa";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { getCurrentUTMParams } from "@/src/utils/UTMUtils";

export default function HomePageCareerCTA() {
  const router = useRouter();
  return (
    <section className={styles.careerSection}>
      <div className={styles.container}>
        {/* === LEFT: Content === */}
        <div className={styles.leftContent}>
          <h2 className={styles.heading}>
            Just Graduated? Let&apos;s Fire Up Your Career!
          </h2>

          <p className={styles.subtext}>
            You&apos;ve done your part, now let Flashfire handle the job hunt. <br />
            Our AI-powered team gets your profile recruiter-ready and{" "}
            <strong>
              applies to the right jobs so you can land interviews faster.
            </strong>
          </p>

          <ul className={styles.featuresList}>
            <li>
              <FaBolt className={styles.icon} /> Resume built from scratch &
              tailored for every job
            </li>
            <li>
              <FaBolt className={styles.icon} /> LinkedIn optimized for
              recruiter visibility
            </li>
            <li>
              <FaBolt className={styles.icon} /> AI-backed job targeting for
              your goals
            </li>
            <li>
              <FaBolt className={styles.icon} /> Weekly WhatsApp updates
            </li>
          </ul>

          <div className={styles.ctaRow}>
            <button
              className={styles.ctaButton}
              onClick={() => {
                const utmSource = typeof window !== "undefined" 
                  ? localStorage.getItem("utm_source") || "WEBSITE"
                  : "WEBSITE";
                const utmMedium = typeof window !== "undefined"
                  ? localStorage.getItem("utm_medium") || "Career_CTA_Section"
                  : "Career_CTA_Section";
                
                GTagUTM({
                  eventName: "sign_up_click",
                  label: "Career_CTA_Button",
                  utmParams: {
                    utm_source: utmSource,
                    utm_medium: utmMedium,
                    utm_campaign: typeof window !== "undefined"
                      ? localStorage.getItem("utm_campaign") || "Website"
                      : "Website",
                  },
                });
                
                trackButtonClick("Schedule a Free Career Call", "career_cta", "cta", {
                  button_location: "career_section",
                  section: "career_cta",
                  target_url: "/schedule-a-free-career-call"
                });
                trackSignupIntent("career_cta", {
                  signup_source: "career_cta_button",
                  funnel_stage: "signup_intent",
                  target_url: "/schedule-a-free-career-call"
                });
                
                // Navigate to /schedule-a-free-career-call with preserved UTM params
                const utmParams = getCurrentUTMParams();
                const targetPath = utmParams ? `/schedule-a-free-career-call?${utmParams}` : '/schedule-a-free-career-call';
                
                // Dispatch custom event to force show modal (even if already on the route)
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('showGetMeInterviewModal'));
                }
                
                router.push(targetPath);
              }}
            >
              Schedule a Free Career Call
            </button>
            <div className={styles.userNote}>
              <div className={styles.userAvatars}>
                <Image
                  src="/images/user1.jpg"
                  alt="user1"
                  width={28}
                  height={28}
                  className={styles.avatar}
                />
                <Image
                  src="/images/user2.jpg"
                  alt="user2"
                  width={28}
                  height={28}
                  className={styles.avatar}
                />
                <Image
                  src="/images/user3.jpg"
                  alt="user3"
                  width={28}
                  height={28}
                  className={styles.avatar}
                />
              </div>
              <p>
                Join <span className={styles.highlight}>100+</span> graduates
                who landed offers at top companies.
              </p>
            </div>
          </div>
        </div>

        {/* === RIGHT: Stats Grid === */}
        <div className={styles.rightGrid}>
          <div className={styles.rightGridTop}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>SUCCESS RATE</p>
              <h3 className={styles.statValue}>95%</h3>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>JOB LANDED</p>
              <h3 className={styles.statValue}>50+</h3>
            </div>
          </div>
          <div className={styles.rightGridBottom}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>HOURS SAVED</p>
              <h3 className={styles.statValue}>150+</h3>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>SUPPORT</p>
              <h3 className={styles.statValue}>24/7</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
