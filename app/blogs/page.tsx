import BlogsClient from "@/src/components/blogs/blogsClient";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <BlogsClient />
      <Footer />
    </>
  );
}
