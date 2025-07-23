import Categories from "@/components/Blog/Categories";
import RelatedPost from "@/components/Blog/RelatedPost";
import { SharePost } from "@/components/Blog/SharePost";
import { PropsWithChildren } from "react";

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <div className="pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50 max-w-c-1390 mx-auto px-4 pb-20 md:px-8 2xl:px-0">
      <div className="gap-7.5 xl:gap-12.5 grid lg:grid-cols-[32%_1fr]">
        <aside>
          <div className="animate_top border-stroke shadow-solid-13 dark:border-strokedark dark:bg-blacksection mb-10 rounded-md border bg-white p-3.5">
            <form action="https://formbold.com/s/unique_form_id" method="POST">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Here..."
                  className="border-stroke shadow-solid-12 focus:border-primary focus:outline-hidden dark:border-strokedark dark:focus:border-primary w-full rounded-lg border px-6 py-4 dark:bg-black dark:shadow-none"
                />

                <button
                  className="absolute right-0 top-0 p-5"
                  aria-label="search-icon"
                >
                  <svg
                    className="hover:fill-primary dark:hover:fill-primary fill-black transition-all duration-300 dark:fill-white"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <Categories />
          <RelatedPost />
        </aside>

        <main className="animate_top border-stroke p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection rounded-md border bg-white max-lg:-order-1 md:p-10">
          {children}

          <div className="mt-11">
            <SharePost />
          </div>
        </main>
      </div>
    </div>
  );
}
