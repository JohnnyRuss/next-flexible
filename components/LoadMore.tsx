"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

interface LoadMoreType {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

const LoadMore: React.FC<LoadMoreType> = ({
  startCursor,
  endCursor,
  hasNextPage,
  hasPreviousPage,
}) => {
  const router = useRouter();

  function onPagination(direction: string) {
    const currentParams = new URLSearchParams(window.location.search);

    if (direction === "next" && hasNextPage) {
      currentParams.set("start_cursor", endCursor);
      currentParams.delete("end_cursor");
    } else if (direction === "prev") {
      currentParams.set("end_cursor", startCursor);
      currentParams.delete("start_cursor");
    }

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathname);
  }

  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && (
        <Button
          type="button"
          title="Previous Page"
          handleClick={() => onPagination("prev")}
        />
      )}
      {hasNextPage && (
        <Button
          type="button"
          title="Next Page"
          handleClick={() => onPagination("next")}
        />
      )}
    </div>
  );
};

export default LoadMore;
