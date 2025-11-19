import { notFound } from "next/navigation";
import { blogPosts } from "@/src/data/blogsData";
import BlogsPage from "@/src/components/blogs/blogsPage";

type Props = {
  params: {
    slug: string;
  };
};

// export async function generateStaticParams() {
//   return blogPosts.map((post: any) => ({
//     slug: post.slug,
//   }));
// }

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return notFound();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  return <BlogsPage post={post} />;
}
