import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { usePagination } from "@/hooks/use-pagination.hook";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  pageSizeSelected?: number;
  pageSizeOptions?: number[];
}

export function Pagination({
  totalItems,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: PaginationProps) {
  const {
    limit,
    setLimit,
    hasPreviousPage,
    hasNextPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
  } = usePagination(totalItems);

  return (
    <div className="flex items-center justify-between gap-2 pb-4 text-foreground">
      <div>
        <Select
          value={limit.toString()}
          onValueChange={(value) => {
            setLimit(parseInt(value, 10));
            goToFirstPage();
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-center justify-end gap-2 sm:flex-row">
        <div className="flex items-center gap-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToFirstPage}
            disabled={!hasPreviousPage}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToPreviousPage}
            disabled={!hasPreviousPage}
          >
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToNextPage}
            disabled={!hasNextPage}
          >
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToLastPage}
            disabled={!hasNextPage}
          >
            <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
