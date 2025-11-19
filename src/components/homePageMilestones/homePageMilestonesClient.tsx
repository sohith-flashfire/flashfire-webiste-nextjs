"use client";

import Image from "next/image";
import styles from "./homePageMilestones.module.css";

export default function HomePageMilestonesClient() {
  // Fallback logo URLs for companies where Clearbit doesn't work
  const logoFallbacks: Record<string, string> = {
    IBM: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/150px-IBM_logo.svg.png",
  };

  const footerCompanies = [
    { name: "Wise", domain: "wise.com" },
    { name: "Deloitte", domain: "deloitte.com" },
    { name: "Amazon", domain: "amazon.com" },
    { name: "Microsoft", domain: "microsoft.com" },
    { name: "Google", domain: "google.com" },
    { name: "Akamai", domain: "akamai.com" },
    { name: "Skyworks", domain: "skyworksinc.com" },
  ];

  const testimonials = [
    {
      company: "MiRUs",
      domain: "mirus.ai",
      text: "Flashfire completely transformed my job search experience. The AI-powered platform guided me through my entire application process, automatically tailoring my resume for each role and tracking every application. I landed interviews at MiRUs within just 10 days, and the personalized approach made all the difference. The real-time updates kept me informed every step of the way!",
      user: "Kanchan",
      role: "Health Data Scientist",
      image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/kanchan.jpeg",


    },
    {
      company: "MaineHealth Medical Center",
      domain: "mainehealth.org/maine-medical-center",
      text: "I was struggling with the overwhelming job application process until I found Flashfire. The resume booster and intelligent job tracker saved me hours daily by automating the tedious parts. The platform's ATS optimization ensured my applications got noticed, and I received an offer from MaineHealth Medical Center in just 3 weeks. This tool is absolutely essential for anyone serious about landing their dream job!",
      user: "Uhtiha",
      role: "Operations Transformation Specialist",
      image: "/images/uhitha.jpeg",
    },
    {
      company: "Skyworks Solutions",
      domain: "skyworksinc.com",
      text: "From complete job search chaos to absolute clarity — Flashfire changed everything for me. The automated application system handled hundreds of applications while I focused on preparing for interviews. I received interview calls from Skyworks Solutions in my first week, and the structured approach made the entire process stress-free. Highly recommend to all job seekers!",
      user: "Anjali",
      role: "Materials Planning Specialist 2",
      image: "/images/anjali.jpeg",
    },
    {
      company: "Akamai Technologies",
      domain: "akamai.com",
      text: "The AI-powered application system from Flashfire was absolutely incredible. It analyzed job descriptions, optimized my resume for each position, and sent out applications automatically. The platform's intelligent matching ensured I only applied to roles that fit my skills. I landed an interview at Akamai Technologies within 2 weeks and couldn't be happier with the results!",
      user: "Akrati",
      role: "Marketing Program Specialist",
      image: "/images/akrati.jpeg",
    },
    {
      company: "Deloitte",
      domain: "deloitte.com",
      text: "Flashfire's advanced ATS optimization technology helped me stand out in a competitive consulting market. The platform's resume tailoring and cover letter generation were spot-on, matching each firm's requirements perfectly. I received multiple offers from top consulting firms including Deloitte, and the entire process was seamless. This is the future of job searching!",
      user: "Neha",
      role: "Strategy Consultant",
      image: "/images/neha.png",
    },
    {
      company: "LVIS",
      domain: "lviscorp.com",
      text: "The automated application system from Flashfire was a complete game-changer for my career. Instead of spending hours on each application, the platform handled everything while I focused on interview prep. The AI-powered resume optimization and job matching were incredibly accurate. I landed an offer at LVIS in just 2 weeks — something I never thought possible!",
      user: "Teja",
      role: "IT & Customer Support Engineer",
      image: "/images/TEJA.jpeg",
    },
    {
      company: "IBM",
      domain: "ibm.com",
      text: "Flashfire's personalized approach made all the difference in my job search. The platform generated tailored cover letters and optimized my resume for each role, ensuring I got noticed by recruiters. The detailed tracking system kept me organized throughout the process. My IBM offer was secured thanks to Flashfire's intelligent automation and attention to detail!",
      user: "Aryan",
      role: "Software Engineer",
      image: "/images/aryan.jpg",
    },
    {
      company: "Armorcode",
      domain: "armorcode.com",
      text: "Tracking 200+ applications manually was impossible, but Flashfire made it effortless. The platform's dashboard showed me exactly where I stood with each application, and the automated follow-ups ensured I never missed an opportunity. Flashfire helped me land my dream role at Armorcode, and I couldn't have done it without their comprehensive tracking system!",
      user: "Amit",
      role: "DevOps Engineer",
      image: "/images/amit.jpg",
    },
    {
      company: "State Street",
      domain: "statestreet.com",
      text: "Flashfire made everything structured and automated, transforming my chaotic job search into a smooth, organized process. The platform's intelligent application system handled all the repetitive work while I focused on what mattered — preparing for interviews. I secured State Street interviews easily, and the entire experience was stress-free and efficient!",
      user: "Rudraksh",
      role: "SDE 1 ",
      image: "/images/rudraksh.jpg",
    },
    {
      company: "Urban Electric Power",
      domain: "urbanelectricpower.com",
      text: "From job search chaos to complete clarity — Flashfire revolutionized how I approached my career search. The platform's AI-powered system sent out hundreds of tailored applications automatically, and I received 4 interview calls from top companies in my first week alone. The real-time tracking and optimization features are game-changers. I landed my role at Urban Electric Power and couldn't be happier!",
      user: "Sai Krishna",
      role: "Data Analyst",
      image: "/images/SAI KRISHNA.jpeg",
    },
    {
      company: "Wise",
      domain: "wise.com",
      text: "The AI-powered resume tailoring from Flashfire was absolutely perfect. Each application was customized to match the job requirements, and the platform's intelligent matching ensured I was applying to the right roles. The automated system saved me countless hours while maintaining quality. I received a Wise offer within a month, and I'm thrilled with the results!",
      user: "Rijul Jain",
      role: "Product Specialist",
      image: "/images/rijul.jpg",
    },
    {
      company: "Barclays",
      domain: "barclays.com",
      text: "Flashfire guided me through my entire application process with precision and efficiency. The platform's comprehensive approach — from resume optimization to automated applications — made everything seamless. The real-time updates and tracking kept me informed throughout. I landed interviews at Barclays within 10 days, and the structured process made all the difference!",
      user: "Aman Guleria",
      role: "BA 1",
      image: "/images/aman.jpg",
    },
  ];

  return (
    <section className={styles.milestoneContainer}>
      {/* === Section Heading === */}
      <h4 className={styles.sectionHeading}>INTERVIEWS CRACKED BY OUR USERS</h4>

      {/* === Continuous Marquee Testimonials === */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {[...testimonials, ...testimonials].map((t, i) => {
            return (
              <div key={i} className={styles.marqueeCard}>
                <div className={styles.companyHeader}>
                  <div className={styles.companyLogoIcon}>
                    <Image
                      src={`https://logo.clearbit.com/${t.domain}`}
                      alt={t.company}
                      width={32}
                      height={32}
                      className={styles.companyLogo}
                      onError={(e) => {
                        // Fallback to company name if logo fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <p className={styles.companyName}>{t.company}</p>
                </div>
                <p className={styles.testimonialText}>{t.text}</p>
                <div className={styles.userInfo}>
                  {t.image ? (
                    <div className={styles.userAvatar}>
                      <Image
                        src={t.image}
                        alt={t.user}
                        width={40}
                        height={40}
                        className={styles.userAvatarImage}
                      />
                    </div>
                  ) : (
                    <div className={styles.userAvatar}></div>
                  )}
                  <div>
                    <p className={styles.userName}>{t.user}</p>
                    <p className={styles.userCompany}>{t.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* === Footer Logos === */}
      <div className={styles.footerLogos}>
        {footerCompanies.map((company, i) => {
          const fallbackUrl = logoFallbacks[company.name];
          const logoSrc = fallbackUrl || `https://logo.clearbit.com/${company.domain}`;
          
          return (
            <span key={i}>
              <span className={styles.footerIcon}>
                <Image
                  src={logoSrc}
                  alt={company.name}
                  width={24}
                  height={24}
                  className={styles.footerLogo}
                  onError={(e) => {
                    // If fallback exists and we're using Clearbit, try fallback
                    if (!fallbackUrl && logoFallbacks[company.name]) {
                      const target = e.target as HTMLImageElement;
                      target.src = logoFallbacks[company.name];
                      return;
                    }
                    // Otherwise hide the image
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </span>
              {company.name}
            </span>
          );
        })}
      </div>
    </section>
  );
}
