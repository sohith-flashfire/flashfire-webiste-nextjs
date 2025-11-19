"use client";

import styles from "./blogs.module.css";
import BlogCard from "./blogCard";
import { blogPosts } from "@/src/data/blogsData";

export default function BlogsClient() {
  return (
    <section className={styles.blogsSection}>
      <header className={styles.header}>
        <h2>Insights That Spark Career Growth.</h2>
        <p>
          Learn how to outsmart hiring systems, stand out to recruiters, and
          stay ahead with{" "}
          <span className={styles.highlight}>Flashfire’s expert-backed</span>{" "}
          tips.
        </p>
      </header>

      <div className={styles.blogGrid}>
        {blogPosts.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
