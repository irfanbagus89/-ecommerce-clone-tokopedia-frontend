import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-4 text-sm", className)}
      {...props}
    />
  );
}

function PaginationItem(props) {
  return <li data-slot="pagination-item" {...props} />;
}

function PaginationLink({ className, isActive, ...props }) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      className={cn(
        "relative px-1 text-gray-500 hover:text-gray-900 transition cursor-pointer",
        isActive &&
          "text-green-600 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-green-600",
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }) {
  return (
    <button
      aria-label="Go to previous page"
      className={cn(
        "text-gray-400 hover:text-gray-700 transition disabled:opacity-40",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon className="w-4 h-4" />
    </button>
  );
}

function PaginationNext({ className, ...props }) {
  return (
    <button
      aria-label="Go to next page"
      className={cn(
        "text-gray-400 hover:text-gray-700 transition disabled:opacity-40",
        className
      )}
      {...props}
    >
      <ChevronRightIcon className="w-4 h-4" />
    </button>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("text-gray-400 select-none", className)}
      {...props}
    >
      ...
    </span>
  );
}

function CustomPagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 3,
  className,
}) {
  const pages = React.useMemo(() => {
    const items = [];

    const start = Math.max(2, page - siblingCount);
    const end = Math.min(totalPages - 1, page + siblingCount);

    items.push(1);

    if (start > 2) items.push("ellipsis");

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (end < totalPages - 1) items.push("ellipsis");

    if (totalPages > 1) items.push(totalPages);

    return items;
  }, [page, totalPages, siblingCount]);

  if (totalPages <= 1) return null;

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && onPageChange(page - 1)}
            disabled={page === 1}
          />
        </PaginationItem>

        {/* Pages */}
        {pages.map((item, index) => (
          <PaginationItem key={index}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={item === page}
                onClick={() => onPageChange(item)}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => page < totalPages && onPageChange(page + 1)}
            disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  CustomPagination,
};
