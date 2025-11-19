"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./blogsPage.module.css";
import {
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
} from "@/src/utils/PostHogTracking";
import posthog from "posthog-js";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Link from "next/link";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  image: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  content: string;
};

export default function BlogsPage({ post }: { post: BlogPost }) {
  useEffect(() => {
    if (!post) return;

    window.scrollTo(0, 0);
    const startedAt = Date.now();

    try {
      posthog.capture?.("blog_view", {
        blog_id: post.id,
        blog_slug: post.slug,
        blog_title: post.title,
        blog_category: post.category,
        blog_read_time: post.readTime,
        blog_date: post.date,
        page_url: window.location.href,
      });

      trackPageView("blog_detail", undefined, {
        blog_id: post.id,
        blog_slug: post.slug,
        blog_title: post.title,
      });
    } catch {}

    const marks = new Set<number>();
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const percent = Math.min(100, Math.round((scrollTop / height) * 100));
      [25, 50, 75, 100].forEach((t) => {
        if (percent >= t && !marks.has(t)) {
          marks.add(t);
          trackScrollDepth(t, "blog_detail", { blog_slug: post.slug });
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      const timeSpentSec = Math.round((Date.now() - startedAt) / 1000);
      trackTimeOnPage(timeSpentSec, "blog_detail", { blog_slug: post.slug });
    };
  }, [post]);

  return (
    <>
      <Navbar />
      <div className={styles.pageWrapper}>
        <div className={styles.blogContainer}>
          {/* === HEADER BAND === */}
          <div className={styles.headerBand}>
            <h2 className={styles.brand}>FLASHFIRE</h2>
            <p className={styles.subBrand}>
              Your AI-Powered Job Search Platform
            </p>
          </div>

          {/* === CATEGORY === */}
          <div className={styles.categoryWrapper}>
            <span className={`${styles.categoryTag} ${post.categoryColor}`}>
              {post.category}
            </span>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src={post.image}
              alt={post.title}
              width={900}
              height={500}
              className={styles.image}
            />
          </div>

          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.meta}>
            <span>📅 {post.date}</span>
            <span>⏱️ {post.readTime}</span>
          </div>

          <article
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* === CTA === */}
          <div className={styles.ctaBox}>
            <h3>Ready to accelerate your job search?</h3>
            <p>
              Join thousands of international students landing their dream jobs
              in the U.S.
            </p>
            <a
              href="https://www.flashfirejobs.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              Visit FlashFire Jobs
            </a>
          </div>
          <Link href={`/blogs`} className={styles.closeBtn}>
            Close Article
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
