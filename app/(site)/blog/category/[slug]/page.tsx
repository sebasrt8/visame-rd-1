import BlogItem from "@/components/Blog/BlogItem";
import { getPostByCategory } from "@/sanity/sanity-utils";
import { Blog } from "@/types/blog";
import { integrations } from "@/integration.config";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props : Props) {
  const params = await props.params;
  const { slug } = params;

  const formattedCategory = slug.charAt(0).toUpperCase() + slug.slice(1);

  if (slug) {
    return {
      title: ` ${formattedCategory} | NextBlog - Next.js Blog Template`,
      description: "This is the Category page for NextBlog",
      author: "NextBlog",

      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
    };
  } else {
    return {
      title: "Not Found",
      description: "No category has been found",
    };
  }
}

const BlogPage = async (props: Props) => {
  const params = await props.params;
  const posts: Blog[] = integrations.isSanityEnabled
    ? await getPostByCategory(params.slug)
    : [];

  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {posts.length > 0 &&
              posts.map((post, key) => <BlogItem key={key} blog={post} />)}
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;
