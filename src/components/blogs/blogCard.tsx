"use client";

import styles from "./blogCard.module.css";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import { BsCalendarEvent } from "react-icons/bs";
import Link from "next/link";

type Blog = {
  id: number;
  slug?: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  categoryColor?: string;
};

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <section className={styles.blogCardOuter}>
      <Link
        href={`/blog/${blog.slug}`}
        target="_blank"
        className={styles.blogCard}
      >
        {/* === Image === */}
        <div className={styles.imageWrapper}>
          <Image
            src={blog.image}
            alt={blog.title}
            width={400}
            height={250}
            className={styles.image}
          />
        </div>

        {/* === Content === */}
        <div className={styles.content}>
          <p className={`${styles.tag} ${blog.categoryColor}`}>
            {blog.category.toUpperCase()}
          </p>

          <h3 className={styles.title}>{blog.title}</h3>

          <p className={styles.excerpt}>{blog.excerpt}</p>

          <div className={styles.meta}>
            <span>
              <div className={styles.metaSpanDiv}>
                <BsCalendarEvent className={styles.icon} />
                <p>{blog.date}</p>
              </div>
            </span>
            <span>
              <div className={styles.metaSpanDiv}>
                <FaRegClock className={styles.icon} />
                <p>{blog.readTime.toUpperCase()} READ</p>
              </div>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
