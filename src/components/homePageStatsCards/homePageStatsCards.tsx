import Image from "next/image";
import styles from "./homePageStatsCards.module.css";

export default function HomePageStatsCards() {
  return (
    <section className={styles.statsSection}>
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.iconPlaceholder}>
            <Image
              src="/images/investment.png"
              alt="Return on Investment"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h3>
            <span className={styles.highlight}>200x</span> Return on Investment
          </h3>
          <p>
            Clients see 200x ROI with higher salaries, faster offers, and
            lasting growth.
          </p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.iconPlaceholder}>
            <Image
              src="/images/appliction.png"
              alt="Applications Sent"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h3>
            <span className={styles.highlight}>300k+</span> Applications Sent
            Smartly
          </h3>
          <p>
            Over 300k applications optimized with ATS-friendly resumes and
            custom cover letters.
          </p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.iconPlaceholder}>
            <Image
              src="/images/time.png"
              alt="Time to Interview"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h3>
            <span className={styles.highlight}>1 Week</span> to Your First
            Interview
          </h3>
          <p>
            Flashfire users report getting interview calls within their first 7
            days of usage.
          </p>
        </div>
      </div>
    </section>
  );
}
