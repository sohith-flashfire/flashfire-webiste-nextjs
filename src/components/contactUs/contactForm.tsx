"use client";

import styles from "./contactUs.module.css";

export default function ContactForm() {
  return (
    <form className={styles.form}>
      <h3 className={styles.formHeader}>Share your details to connect</h3>

      {/* === Company Information === */}
      <section className={styles.formSection}>
        <h4>🏢 Company Information</h4>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Company Name*</label>
            <input type="text" placeholder="Enter company name" />
          </div>
          <div className={styles.formGroup}>
            <label>Industry</label>
            <input type="text" placeholder="i.e., Technology, Finance" />
          </div>
          <div className={styles.formGroup}>
            <label>Company Size</label>
            <select>
              <option>Select Company Size</option>
              <option>1–50</option>
              <option>51–200</option>
              <option>201–1000</option>
              <option>1000+</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Location</label>
            <input type="text" placeholder="City / State / Country" />
          </div>
        </div>
      </section>

      {/* === Contact Information === */}
      <section className={styles.formSection}>
        <h4>📞 Contact Information</h4>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Contact Name*</label>
            <input type="text" placeholder="Your full name" />
          </div>
          <div className={styles.formGroup}>
            <label>Email Address*</label>
            <input type="email" placeholder="you@company.com" />
          </div>
          <div className={styles.formGroupFull}>
            <label>Phone Number</label>
            <input type="text" placeholder="+1 000 000 0000" />
          </div>
        </div>
      </section>

      {/* === Hiring Needs === */}
      <section className={styles.formSection}>
        <h4>🧾 Hiring Needs</h4>
        <div className={styles.formGroupFull}>
          <label>Job Title / Position</label>
          <input
            type="text"
            placeholder="i.e., Software Engineer, Data Analyst"
          />
        </div>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Salary Range</label>
            <input type="text" placeholder="₹10,00,000 – ₹18,00,000" />
          </div>
          <div className={styles.formGroup}>
            <label>Urgency</label>
            <select>
              <option>Select</option>
              <option>Immediate</option>
              <option>Within 1 Month</option>
              <option>Flexible</option>
            </select>
          </div>
        </div>
        <div className={styles.formGroupFull}>
          <label>Job Description</label>
          <textarea
            placeholder="Brief description of the role & requirements"
            rows={3}
          />
        </div>
        <div className={styles.formGroupFull}>
          <label>Additional Hiring Needs</label>
          <textarea
            placeholder="Any specific requirement or additional information"
            rows={2}
          />
        </div>
      </section>

      <div className={styles.submitWrapper}>
        <button type="submit" className={styles.submitButton}>
          Submit Hiring Request →
        </button>
      </div>
    </form>
  );
}
