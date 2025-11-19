"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./homePageResultStats.module.css";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { getCurrentUTMParams } from "@/src/utils/UTMUtils";

export default function HomePageResultStats() {
  const router = useRouter();

  return (
    <section className={styles.resultSection}>
      {/* Right Side (Image first in HTML so it appears on top on mobile) */}
      <div className={styles.resultRight}>
        <Image
          src="/images/heroResultImage.jpg"
          alt="Interview illustration"
          className={styles.resultImage}
          width={700}
          height={700}
          priority
        />
      </div>

      {/* Left Side */}
      <div className={styles.resultLeft}>
        <p className={styles.resultTagline}>RESULT THAT SPEAKS</p>

        <h2 className={styles.resultHeading}>
          Interviews in weeks.
          <br />
          Offers in months.
        </h2>

        <div className={styles.resultStats}>
          <div className={styles.resultStatBox}>
            <h3 className={styles.resultStatNumber}>95%</h3>
            <hr className={styles.resultStatsHR} />
            <p className={styles.resultStatText}>
              Users land interview call within a month*
            </p>
          </div>
          <div className={styles.resultStatBox}>
            <h3 className={styles.resultStatNumber}>90%</h3>
            <hr className={styles.resultStatsHR} />
            <p className={styles.resultStatText}>
              Users get job offer within 3 months*
            </p>
          </div>
        </div>

        <p className={styles.resultNote}>
          *Based on verified user data from 2024-25 cohort.
        </p>

        <button
          className={styles.resultButton}
          onClick={() => {
            const utmSource = typeof window !== "undefined" 
              ? localStorage.getItem("utm_source") || "WEBSITE"
              : "WEBSITE";
            const utmMedium = typeof window !== "undefined"
              ? localStorage.getItem("utm_medium") || "Result_Stats_Section"
              : "Result_Stats_Section";
            
            GTagUTM({
              eventName: "sign_up_click",
              label: "Result_Stats_Get_Me_Interview_Button",
              utmParams: {
                utm_source: utmSource,
                utm_medium: utmMedium,
                utm_campaign: typeof window !== "undefined"
                  ? localStorage.getItem("utm_campaign") || "Website"
                  : "Website",
              },
            });
            
            // PostHog tracking
            trackButtonClick("Get Me Interview", "result_stats_cta", "cta", {
              button_location: "result_stats_section",
              section: "result_stats"
            });
            trackSignupIntent("result_stats_cta", {
              signup_source: "result_stats_button",
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
        >
          Get Me Interview →
        </button>
      </div>
    </section>
  );
}
