"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categoryFilters } from "@/constants";

const Categories: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filter = searchParams.get("category");

  function onTag(category: string) {
    if (filter === category) router.push(pathname);
    else router.push(`${pathname}?category=${category}`);
  }

  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onTag(category)}
            className={`px-4 py-3 rounded-lg capitalize whitespace-nowrap ${
              category === filter
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            }`}
          >
            {category}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
