"use client";

import { imageBuilder } from "@/sanity/sanity-utils";
import type { Blog } from "@/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ blog }: { blog: Blog }) => {
  const { mainImage, title, metadata, slug } = blog;

  return (
    <motion.article
      variants={{
        hidden: {
          opacity: 0,
          y: -20,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}
      className="animate_top shadow-solid-8 dark:bg-blacksection group relative rounded-lg bg-white p-4 pb-9"
    >
      <div className="aspect-368/239 overflow-hidden rounded-lg">
        {mainImage ? (
          <Image
            src={imageBuilder(mainImage).url()}
            alt={"Cover image for blog title: " + title}
            width={368}
            height={239}
            className="h-full w-full object-cover duration-300 group-hover:scale-110"
          />
        ) : (
          <p className="px-4">No Image provided</p>
        )}
      </div>

      <div className="px-4">
        <h3 className="mt-7.5 xl:text-itemtitle2 mb-3.5 text-lg font-medium text-black dark:text-white">
          <Link
            href={`/blog/${slug.current}`}
            className="hover:text-primary line-clamp-2"
          >
            <span className="absolute inset-0" aria-hidden />

            {title}
          </Link>
        </h3>

        <p className="line-clamp-3">{metadata}</p>
      </div>
    </motion.article>
  );
};

export default BlogItem;
