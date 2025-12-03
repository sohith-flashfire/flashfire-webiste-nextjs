"use client";

import { usePathname } from "next/navigation";
import styles from "./footer.module.css";
import { FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import FlashfireLogo from "@/src/components/FlashfireLogo";

export default function Footer() {
  const pathname = usePathname();
  const isCanadaContext = pathname.startsWith("/en-ca");
  const prefix = isCanadaContext ? "/en-ca" : "";
  
  const getHref = (href: string) => {
    if (href.startsWith("http")) {
      return href;
    }
    return `${prefix}${href}`;
  };

  return (
    <footer className={styles.footer}>
      {/* === Top Section === */}
      <div className={styles.footerTop}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <div className={styles.logoWrapper}>
            <FlashfireLogo
              variant="white"
              width={40}
              height={40}
            />
            <span className={styles.logoText}>FLASHFIRE</span>
          </div>
        </div>

        {/* Links aligned row-wise with headings */}
        <div className={styles.linksContainer}>
          <div className={styles.linkRow}>
            <h4>QUICK ACCESS</h4>
            <div className={styles.linkItems}>
              <Link href={getHref("/feature")} className={styles.footerLink}>Features</Link>
              <Link href={getHref("/testimonials")} className={styles.footerLink}>Testimonials</Link>
              <Link href={getHref("/pricing")} className={styles.footerLink}>Pricing</Link>
              <Link href={getHref("/faq")} className={styles.footerLink}>FAQ</Link>
              <Link href={getHref("/blogs")} className={styles.footerLink}>Blog</Link>
            </div>
          </div>

          <div className={styles.linkRow}>
            <h4>COMPANY STUFF</h4>
            <div className={styles.linkItems}>
              <Link href={getHref("/refund-policy")} className={styles.footerLink} target="_blank" rel="noopener noreferrer">Refund Policy</Link>
              <Link href={getHref("/privacy-policy")} className={styles.footerLink} target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
              <Link href={getHref("/payment-policy")} className={styles.footerLink} target="_blank" rel="noopener noreferrer">Payment Policy</Link>
              <Link href={getHref("/terms-of-service")} className={styles.footerLink} target="_blank" rel="noopener noreferrer">Terms of Service</Link>
            </div>
          </div>

          <div className={styles.linkRow}>
            <h4>FOLLOW US</h4>
            <div className={styles.socialIcons}>
              <Link
                href="https://www.linkedin.com/company/flashfire-pvt-ltd/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </Link>
              <Link
                href="https://www.instagram.com/flashfirejobs/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </Link>
              <Link
                href="https://www.youtube.com/@flashfireindia"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* === Bottom Section === */}
      <div className={styles.footerBottom}>
        <p className={styles.copyText}>
          @ Flashfire 2025 | All Rights Reserved
        </p>
        <p className={styles.companyText}>Flashfire Pvt. Ltd.</p>
      </div>
    </footer>
  );
}
