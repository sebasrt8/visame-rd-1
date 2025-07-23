import ImageUrlBuilder from "@sanity/image-url";
import { groq } from "next-sanity";
import { createClient, type QueryParams } from "next-sanity";
import clientConfig from "./config/client-config";
import {
  postQuery,
  postQueryByCategory,
  postQueryByTag,
  postQueryBySlug,
} from "./sanity-query";
import { Blog } from "@/types/blog";
import { integrations } from "@/integration.config";

export async function sanityFetch<QueryResponse>({
  query,
  qParams,
  tags,
}: {
  query: string;
  qParams: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  if (integrations.isSanityEnabled) {
    const client = createClient(clientConfig);

    return client.fetch<QueryResponse>(query, qParams, {
      cache: "force-cache",
      next: { tags },
    });
  } else {
    return {} as QueryResponse;
  }
}

export function imageBuilder(source: string) {
  return ImageUrlBuilder(clientConfig).image(source);
}

export async function getPosts() {
  const posts: Blog[] = await sanityFetch({
    query: postQuery,
    qParams: {},
    tags: ["post", "category"],
  });
  return posts;
}

export async function getCategories() {
  const categories: any = await sanityFetch({
    query: groq`*[_type == "category"] {
     _id,
     name,
     image,
     slug
    }`,
    qParams: {},
    tags: ["category"],
  });
  return categories;
}

export async function getPostByCategory(slug: string) {
  const posts: Blog[] = await sanityFetch({
    query: postQueryByCategory,
    qParams: { slug },
    tags: ["post", "category"],
  });
  return posts;
}

export async function getPostByTag(tag: string) {
  const posts: Blog[] = await sanityFetch({
    query: postQueryByTag,
    qParams: { slug: tag },
    tags: ["post", "category", "tag"],
  });
  return posts;
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const post: Blog = await sanityFetch({
    query: postQueryBySlug,
    qParams: { slug },
    tags: ["post", "category"],
  });
  return post;
}
