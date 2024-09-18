import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import LucideIcon from "@/components/lucide-icon";

interface CustomPaginationProps {
  setPageSize: (pageSize: number) => void;
  pageSize: number;
  pageSizeOptions: number[];
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  maxPage: number;
  canPrevPage: boolean;
  canNextPage: boolean;
}

export default function CustomPagination({
  setPageSize,
  pageSize,
  pageSizeOptions,
  currentPage,
  setCurrentPage,
  maxPage,
  canNextPage,
  canPrevPage,
}: CustomPaginationProps) {
  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={pageSize} />
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
        <div className="flex items-center justify-center text-sm font-medium">
          Page {currentPage + 1} of {maxPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => setCurrentPage(0)}
            disabled={currentPage === 0}
          >
            <LucideIcon
              name={"ChevronsLeft"}
              className="size-4"
              aria-hidden="true"
            />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <LucideIcon
              name={"ChevronLeft"}
              className="size-4"
              aria-hidden="true"
            />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === maxPage - 1}
          >
            <LucideIcon
              name={"ChevronRight"}
              className="size-4"
              aria-hidden="true"
            />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => setCurrentPage(maxPage - 1)}
            disabled={currentPage === maxPage - 1}
          >
            <LucideIcon
              name={"ChevronsRight"}
              className="size-4"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
