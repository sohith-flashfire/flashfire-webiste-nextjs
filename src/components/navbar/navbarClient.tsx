"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./navbar.module.css";
import type { NavLink, NavbarCTA } from "../../types/navbarData";
import { trackButtonClick, trackModalOpen } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import CalendlyModal from "@/src/components/calendlyModal/CalendlyModal";

type Props = {
  links: NavLink[];
  ctas: NavbarCTA;
};

export default function NavbarClient({ links, ctas }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const pathname = usePathname();
  const isCanadaContext = pathname.startsWith("/en-ca");
  const prefix = isCanadaContext ? "/en-ca" : "";
  
  const isBookPage = pathname === "/schedule-a-free-career-call" || pathname === "/en-ca/schedule-a-free-career-call";
  
  const isExternalHref = (href: string) => href.startsWith("http");
  const primaryIsExternal = isExternalHref(ctas.primary.href);
  const secondaryIsExternal = isExternalHref(ctas.secondary.href);
  
  const getHref = (href: string) => {
    if (isExternalHref(href) || href.startsWith("#")) {
      return href;
    }
    return `${prefix}${href}`;
  };

  // Countdown timer - Set end date (November 28, 2025 11:59 PM)
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Set the target date: November 28, 2025 at 11:59:59 PM
    const targetDate = new Date(2025, 10, 28, 23, 59, 59); // Month is 0-indexed, so 10 = November

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endDate = targetDate.getTime();
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const openCalendly = () => {
    const utmSource = typeof window !== "undefined"
      ? localStorage.getItem("utm_source") || "WEBSITE"
      : "WEBSITE";
    const utmMedium = typeof window !== "undefined"
      ? localStorage.getItem("utm_medium") || "Navigation_Banner"
      : "Navigation_Banner";
    
    // GTag tracking
    GTagUTM({
      eventName: "calendly_modal_open",
      label: "Book_Now_Banner_Button",
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: typeof window !== "undefined"
          ? localStorage.getItem("utm_campaign") || "Website"
          : "Website",
      },
    });
    
    // PostHog tracking (automatically includes UTM via getUTMContext)
    trackButtonClick("Book Now", "navigation_banner", "cta", {
      button_location: "banner",
      navigation_type: "banner_cta",
    });
    trackModalOpen("calendly_modal", "navigation_button", {
      trigger_source: "banner_cta",
    });
    
    setIsCalendlyOpen(true);
  };

  const handleCalendlyClose = () => {
    setIsCalendlyOpen(false);
  };

  return (
    <>
      {/* Sticky Container for Navbar and Banner */}
      <div className="sticky top-0 z-50">
        <nav 
          className={styles.navContainer}
          style={{
            backdropFilter: 'blur(120px)',
            WebkitBackdropFilter: 'blur(120px)',
          }}
        >
      <div className={styles.navInner}>
        {/* Left Section: Logo */}
        <div className={styles.navLeft}>
          <Link href={isCanadaContext ? "/en-ca" : "/"} className={styles.navLogoText}>
            FLASHFIRE
          </Link>
        </div>

        {/* Center Section: Links (Desktop) */}
        <ul className={styles.navLinks}>
          {links.map((link) => (
            <li key={link.href} className={styles.navLinkItem}>
              <a 
                href={getHref(link.href)} 
                className={styles.navLinkText}
                target={link.target}
                rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Section: CTAs (Desktop) */}
        <div className={styles.navRight}>
          {secondaryIsExternal ? (
            <a
              href={ctas.secondary.href}
              className={styles.navSecondaryButton}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackButtonClick(ctas.secondary.label, "navigation", "secondary", {
                  button_location: "navbar_desktop",
                  navigation_type: "secondary_cta"
                });
              }}
            >
              {ctas.secondary.label}
            </a>
          ) : (
            <Link
              href={ctas.secondary.href}
              className={styles.navSecondaryButton}
              onClick={() => {
                trackButtonClick(ctas.secondary.label, "navigation", "secondary", {
                  button_location: "navbar_desktop",
                  navigation_type: "secondary_cta"
                });
              }}
            >
              {ctas.secondary.label}
            </Link>
          )}
          {primaryIsExternal ? (
            <a
              href={ctas.primary.href}
              className={styles.navPrimaryButton}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackButtonClick(ctas.primary.label, "navigation", "cta", {
                  button_location: "navbar_desktop",
                  navigation_type: "primary_cta"
                });
                if (ctas.primary.href.includes("calendly")) {
                  trackModalOpen("calendly_modal", "navigation_button", {
                    trigger_source: "navbar_cta"
                  });
                }
              }}
            >
              {ctas.primary.label}
            </a>
          ) : (
            <Link
              href={ctas.primary.href}
              className={styles.navPrimaryButton}
              onClick={() => {
                trackButtonClick(ctas.primary.label, "navigation", "cta", {
                  button_location: "navbar_desktop",
                  navigation_type: "primary_cta"
                });
                if (ctas.primary.href.includes("calendly")) {
                  trackModalOpen("calendly_modal", "navigation_button", {
                    trigger_source: "navbar_cta"
                  });
                }
              }}
            >
              {ctas.primary.label}
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className={styles.navMenuIcon}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div
            className={isMenuOpen ? styles.iconClose : styles.iconHamburger}
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className={styles.navMobileMenu}>
          <ul className={styles.navMobileLinks}>
            {links.map((link) => (
              <li key={link.href}>
                <a 
                  href={getHref(link.href)} 
                  className={styles.navMobileLink}
                  target={link.target}
                  rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.navMobileButtons}>
            <a
              href={ctas.secondary.href}
              className={styles.navMobileSecondary}
              target={secondaryIsExternal ? "_blank" : undefined}
              rel={secondaryIsExternal ? "noopener noreferrer" : undefined}
              onClick={() => {
                trackButtonClick(ctas.secondary.label, "navigation", "secondary", {
                  button_location: "navbar_mobile",
                  navigation_type: "secondary_cta"
                });
              }}
            >
              {ctas.secondary.label}
            </a>
            <a
              href={ctas.primary.href}
              className={styles.navMobilePrimary}
              target={primaryIsExternal ? "_blank" : undefined}
              rel={primaryIsExternal ? "noopener noreferrer" : undefined}
              onClick={() => {
                trackButtonClick(ctas.primary.label, "navigation", "cta", {
                  button_location: "navbar_mobile",
                  navigation_type: "primary_cta"
                });
                if (ctas.primary.href.includes("calendly")) {
                  trackModalOpen("calendly_modal", "navigation_button", {
                    trigger_source: "navbar_mobile_cta"
                  });
                }
              }}
            >
              {ctas.primary.label}
            </a>
          </div>
        </div>
      )}
    </nav>

    {/* Black Friday Sale Banner - Below Navbar */}
    <div className="w-full bg-[#f5f5f0] border-t border-[rgba(241,241,241,0.2)] py-0.5 px-4 flex items-center justify-center max-[900px]:py-0.5 max-[900px]:px-3 font-['Space_Grotesk',sans-serif]">
      <div className="flex items-center justify-center gap-2 flex-wrap max-w-[1400px] w-full max-[900px]:gap-1.5 max-[600px]:flex-col max-[600px]:gap-2">
        <span className="font-bold text-[1.1rem] text-black tracking-[0.02em] uppercase max-[900px]:text-[0.85rem]">
          BLACK FRIDAY SALE
        </span>
        <span className="text-[#ff4c00] text-[1rem] font-bold leading-none max-[900px]:text-sm">
          ✱
        </span>
        <span className="text-[0.85rem] text-black font-medium max-[900px]:text-[0.75rem]">
          Get flat $20 discount on all plans
        </span>
        <span className="text-[#ff4c00] text-[1rem] font-bold leading-none max-[900px]:text-sm">
          ✱
        </span>
        <div className="flex gap-1 items-center max-[600px]:gap-0.5">
          <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
            <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
              Days
            </div>
          </div>
          <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
            <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
              Hrs
            </div>
          </div>
          <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
            <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
              Mins
            </div>
          </div>
          <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
            <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
              Secs
            </div>
          </div>
        </div>
        <button
          onClick={openCalendly}
          className="rounded-full bg-white text-red-600 font-bold px-5 sm:px-6 py-2 shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 text-sm sm:text-base ml-3 max-[600px]:ml-2"
        >
          Book Now
        </button>
      </div>
    </div>
      </div>

      {/* Calendly Modal */}
      <CalendlyModal
        isVisible={isCalendlyOpen}
        onClose={handleCalendlyClose}
        user={{
          fullName: "",
          email: "",
          phone: "",
          countryCode: "",
        }}
      />
    </>
  );
}
