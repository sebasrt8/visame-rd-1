import { getAllPosts } from "@/app/libs/markdown";
import SidebarLink from "@/components/Docs/SidebarLink";
import { PropsWithChildren } from "react";

export default async function LayoutPage({ children }: PropsWithChildren) {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <div className="max-w-c-1390 mx-auto grid gap-x-8 gap-y-6 pb-16 pt-24 max-lg:px-4 md:pb-20 md:pt-28 lg:grid-cols-[25%_1fr] lg:pb-24 lg:pt-32">
      <aside className="shadow-solid-4 dark:border-strokedark dark:bg-blacksection max-h-fit rounded-lg border border-white p-4 transition-all lg:sticky lg:top-[80px]">
        <ul className="space-y-2">
          {posts.map((post) => (
            <SidebarLink title={post.title} slug={post.slug} key={post.slug} />
          ))}
        </ul>
      </aside>

      <div className="blog-details-docs shadow-three dark:bg-gray-dark rounded-xs bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
        <div className="prose dark:prose-invert max-w-none">{children}</div>
      </div>
    </div>
  );
}
