"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PropsType = {
  slug: string;
  title: string;
};

const SidebarLink = ({ slug, title }: PropsType) => {
  const pathUrl = usePathname();

  return (
    <li>
      <Link
        href={`/docs/${slug}`}
        className={`bg-stroke flex w-full rounded-sm px-3 py-2 text-base ${
          pathUrl === `/docs/${slug}`
            ? "dark:bg-blackho text-black dark:text-white"
            : "dark:hover:bg-blackho bg-white dark:bg-transparent dark:text-white "
        }`}
      >
        {title}
      </Link>
    </li>
  );
};

export default SidebarLink;
