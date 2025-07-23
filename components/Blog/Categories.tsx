import React from "react";
import { getCategories } from "@/sanity/sanity-utils";
import Link from "next/link";

const Categories = async () => {
  const data = await getCategories();

  return (
    <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
      <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
        Categories
      </h4>

      <ul>
        {data.length > 0 &&
          data.map((category: any) => (
            <li
              key={category?._id}
              className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary capitalize"
            >
              <Link className="capitalize" href={`/blog/category/${category.slug.current}`}>
                {category.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;
