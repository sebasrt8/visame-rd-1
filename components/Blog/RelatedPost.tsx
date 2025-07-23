import { getPosts, imageBuilder } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";

const RelatedPost = async () => {
  const posts = await getPosts();

  return (
    <section className="animate_top border-stroke shadow-solid-13 dark:border-strokedark dark:bg-blacksection rounded-md border bg-white p-9">
      <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
        Related Posts
      </h4>

      <div className="space-y-7.5">
        {posts.slice(0, 3).map((post, key) => (
          <div
            className="relative grid grid-cols-1 gap-5 md:grid-cols-2"
            key={key}
          >
            <div className="max-w-45 h-18">
              {post.mainImage ? (
                <Image
                  src={imageBuilder(post.mainImage).url()}
                  alt={"Cover image for blog title: " + post.title}
                  width={368}
                  height={239}
                  className="h-full object-cover"
                />
              ) : (
                <p className="px-4">No Image provided</p>
              )}
            </div>

            <h5 className="text-md font-medium text-black transition-all duration-300 dark:text-white">
              <Link
                href={`/blog/${post.slug.current}`}
                className="hover:text-primary line-clamp-2"
              >
                <span className="absolute inset-0" aria-hidden />
                {post.title}
              </Link>
            </h5>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedPost;
