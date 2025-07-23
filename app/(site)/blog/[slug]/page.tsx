import { structuredAlgoliaHtmlData } from "@/app/libs/crawlIndex";
import { SharePost } from "@/components/Blog/SharePost";
import { getPostBySlug, imageBuilder } from "@/sanity/sanity-utils";
import { Blog } from "@/types/blog";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { integrations } from "@/integration.config";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const post: Blog = integrations.isSanityEnabled
    ? await getPostBySlug(slug)
    : ({} as Blog);
  const siteURL = process.env.SITE_URL;
  const siteName = process.env.SITE_NAME;
  const authorName = process.env.AUTHOR_NAME;

  if (post) {
    return {
      title: `${post.title || "Single Post Page"} | ${siteName}`,
      description: `${post.metadata?.slice(0, 136)}...`,
      author: authorName,

      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },

      openGraph: {
        title: `${post.title} | ${siteName}`,
        description: post.metadata,
        url: `${siteURL}/blog/${post?.slug?.current}`,
        siteName: siteName,
        images: [
          {
            url: imageBuilder(post.mainImage).url(),
            width: 1800,
            height: 1600,
            alt: post.title,
          },
        ],
        locale: "en_US",
        type: "article",
      },

      twitter: {
        card: "summary_large_image",
        title: `${post.title} | ${siteName}`,
        description: `${post.metadata?.slice(0, 136)}...`,
        creator: `@${authorName}`,
        site: `@${siteName}`,
        images: [imageBuilder(post?.mainImage).url()],
        url: `${siteURL}/blog/${post?.slug?.current}`,
      },
    };
  } else {
    return {
      title: "Not Found",
      description: "No blog article has been found",
    };
  }
}

const SingleBlogPage = async (props: Props) => {
  const { slug } = await props.params;

  const post = integrations.isSanityEnabled && (await getPostBySlug(slug));

  if (!post) {
    notFound();
  }

  await structuredAlgoliaHtmlData({
    type: "blog",
    title: post?.title || "",
    htmlString: post?.metadata || "",
    pageUrl: `${process.env.SITE_URL}/blog/${post?.slug?.current}`,
    imageURL: imageBuilder(post?.mainImage).url(),
  });

  return (
    <article>
      {post.mainImage && (
        <Image
          src={imageBuilder(post?.mainImage).url()}
          alt={post.title}
          width={815}
          height={370}
          className="aspect-97/60 sm:aspect-97/44 mb-10 rounded-md object-cover object-center"
        />
      )}

      <h1 className="2xl:text-sectiontitle2 mb-5 mt-11 text-3xl font-semibold text-black dark:text-white">
        {post.title}
      </h1>

      <dl className="2xl:gap-7.5 mb-9 flex flex-wrap gap-5 [&_dd]:text-black dark:[&_dd]:text-white">
        {post.author?.name && (
          <div className="flex gap-[1ch]">
            <dt>{post.author?.name}</dt>
            <dd className="-order-1">Author:</dd>
          </div>
        )}

        {post.publishedAt && (
          <div className="flex gap-[1ch]">
            <dt>{formatDate(post?.publishedAt)}</dt>
            <dd className="-order-1">Published On:</dd>
          </div>
        )}

        {post.tags && (
          <div className="flex gap-[1ch]">
            <dt>
              {post.tags.map((tag, i, tags) => (
                <span key={tag}>
                  <Link href={`/blog/tag/${tag}`}>#{tag}</Link>
                  {i < tags.length - 1 && <span>, </span>}
                </span>
              ))}
            </dt>
            <dd className="-order-1">Tags:</dd>
          </div>
        )}
      </dl>

      <div className="prose dark:prose-invert">
        <PortableText value={post?.body as any} />
      </div>

    </article>
  );
};

export default SingleBlogPage;
