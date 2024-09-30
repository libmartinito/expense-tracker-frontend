"use client"

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { links, meta } from "@/app/(app)/expenses/page";

type ExpensesPaginationProps = {
  page: number | undefined,
  meta: meta,
  links: links,
  getExpenses: (links?: string) => Promise<void>
}

const ExpensesPagination = ({ page, meta, links, getExpenses }: ExpensesPaginationProps) => {
  return (
    <Pagination className="items-center gap-4 pb-32 pt-8">
      <div className="text-sm">
        Page {page ? page : 1} of {meta.total_pages}
      </div>

      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            className={
              !!links.first && meta.total_pages !== 1 && meta.current_page !== 1
                ? ""
                : "pointer-events-none cursor-default"
            }
            onClick={() => getExpenses(links.first)}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="ghost"
            className={
              !!links.prev && meta.total_pages !== 1
                ? ""
                : "pointer-events-none cursor-default"
            }
            onClick={() => getExpenses(links.prev)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="ghost"
            className={
              !!links.next && meta.total_pages !== 1
                ? ""
                : "pointer-events-none cursor-default"
            }
            onClick={() => getExpenses(links.next)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="ghost"
            className={
              !!links.last && meta.total_pages !== 1 && meta.current_page !== meta.total_pages
                ? ""
                : "pointer-events-none cursor-default"
            }
            onClick={() => getExpenses(links.last)}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default ExpensesPagination
