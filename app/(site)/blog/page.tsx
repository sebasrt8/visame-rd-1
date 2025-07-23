import BlogItem from "@/components/Blog/BlogItem";
import { getPosts } from "@/sanity/sanity-utils";
import { Metadata } from "next";

import { integrations, messages } from "@/integration.config";

export const metadata: Metadata = {
  title: "Blog Page - Solid SaaS Boilerplate",
  description: "This is Blog page for Solid Pro",
  // other metadata
};

export default async function Page() {
  const posts = integrations.isSanityEnabled ? await getPosts() : [];

  return (
    <main className="lg:py-25 xl:py-30 py-20">
      <div className="mt-15 max-w-c-1280 mx-auto px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="gap-7.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {posts.map((post) => (
            <BlogItem key={post.slug.current} blog={post} />
          ))}

          {integrations.isSanityEnabled
            ? !posts.length && <p>No posts found</p>
            : messages.sanity}
        </div>
      </div>
    </main>
  );
}
