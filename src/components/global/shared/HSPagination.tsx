import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router";

type TProps = {
  limit: number;
  page: number;
  total: number;
  admin?: boolean;
  customFunction?: (page: number) => void;
};

const HSPagination = ({
  limit,
  page,
  total,
  admin = false,
  customFunction,
}: TProps) => {
  const totalPages = Math.ceil(total / limit);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handlePageChange = (page: number) => {
    params.delete("page");
    params.append("page", page.toString());

    setSearchParams(params);
  };

  return (
    <Pagination className="sm:justify-end">
      <PaginationContent className="flex-wrap gap-2">
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page === 1}
            className={cn(
              "group hover:bg-primary cursor-pointer rounded-md bg-slate-100 aria-disabled:opacity-50",
              {
                "rounded-none border bg-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900 aria-disabled:pointer-events-none":
                  admin,
              },
            )}
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) {
                if (customFunction) {
                  customFunction(page - 1);
                } else {
                  handlePageChange(page - 1);
                }
              }
            }}
          />
        </PaginationItem>

        <RenderPaginationItems
          handlePageChange={customFunction ? customFunction : handlePageChange}
          totalPages={totalPages}
          currentPage={page}
          admin={admin}
        />

        <PaginationItem>
          <PaginationNext
            aria-disabled={page === totalPages}
            className={cn(
              "group hover:bg-primary cursor-pointer rounded-md bg-slate-100 aria-disabled:opacity-50",
              {
                "rounded-none border bg-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900 aria-disabled:pointer-events-none":
                  admin,
              },
            )}
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) {
                if (customFunction) {
                  customFunction(page + 1);
                } else {
                  handlePageChange(page + 1);
                }
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default HSPagination;

const RenderPaginationItems = ({
  totalPages,
  currentPage,
  handlePageChange,
  admin = false,
}: {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  admin?: boolean;
}) => {
  const items = [];
  const maxVisiblePages = 5;
  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const maxPagesBeforeCurrentPage = Math.floor(maxVisiblePages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxVisiblePages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  for (let page = startPage; page <= endPage; page++) {
    items.push(
      <PaginationItem
        key={`pagination-${page}`}
        onClick={() => handlePageChange(page)}
      >
        <PaginationLink
          className={cn("cursor-pointer", {
            "bg-secondary hover:bg-secondary/80 border-secondary text-slate-50 hover:text-slate-50":
              currentPage === page && admin,
            "hover:bg-slate-50 hover:text-slate-900":
              currentPage !== page && admin,
            "rounded-none border": admin,
          })}
        >
          {page}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  if (startPage > 1) {
    items.unshift(
      <PaginationItem
        key="ellipsis-start"
        className={cn("cursor-pointer rounded-md bg-slate-100", {
          "rounded-none": admin,
        })}
      >
        <PaginationEllipsis />
      </PaginationItem>,
    );
  }

  if (endPage < totalPages) {
    items.push(
      <PaginationItem
        key="ellipsis-end"
        className={cn("cursor-pointer rounded-md bg-slate-100", {
          "rounded-none": admin,
        })}
      >
        <PaginationEllipsis />
      </PaginationItem>,
    );
  }

  return items;
};
