"use client";

import styles from "./contactUs.module.css";
import ContactForm from "./contactForm";
import Image from "next/image";

export default function ContactUsClient() {
  return (
    <section className={styles.contactSection}>
      {/* === Left: Fixed Image === */}
      <div className={styles.leftPanel}>
        <Image
          src="/images/partnerWithFF.jpg"
          alt="Partner with Flashfire"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.image}
          priority
        />
        <div className={styles.textOverlay}>
          <h2>
            Partner with <span className={styles.brand}>Flashfire</span> to Find
            Top Talent, Fast.
          </h2>
          <p>
            Flashfire’s AI platform helps you discover, screen, and hire the
            best talent with <em>speed and precision.</em>
          </p>
        </div>
      </div>

      {/* === Right: Scrollable Form === */}
      <div className={styles.rightPanel}>
        <ContactForm />
      </div>
    </section>
  );
}
