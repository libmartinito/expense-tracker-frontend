"use client"

import { Button } from "@/components/ui/button";
import { getToken } from "@/utils/auth";
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import ExpenseListHeader from "@/components/expense-list-header";
import Header from "@/components/header";
import { useSearchParams } from "next/navigation";

type expense = {
  id: number;
  type: string;
  attributes: {
    item: string;
    amount_in_cents: number;
    currency: string;
    purchased_at: Date;
    created_at: Date;
    updated_at: Date;
  };
};

type meta = {
  total?: number
}

type links = {
  first?: string
  last?: string
  prev?: string
  next?: string
}

type expenses = {
  data: expense[]
  meta: meta
  links: links
};

export default function Expenses() {
  const [expenses, setExpenses] = useState<expense[]>([])
  const [meta, setMeta] = useState<meta>({})
  const [links, setLinks] = useState<links>({})
  const searchParams = useSearchParams()

  const page = searchParams.get("page")
  const perPage = searchParams.get("per_page")

  const getExpenses = async () => {
    const backendUrl = "http://localhost:3000/v1/expenses"
    const queryParams = new URLSearchParams()

    if (page) {
      queryParams.append("page", page)
    }

    if (perPage) {
      queryParams.append("per_page", perPage)
    }

    const response: expenses = await fetch(`${backendUrl}?${queryParams}`, {
      headers: {
        "Authorization": getToken() as string
      }
    }).then((res) => res.json())

    setExpenses(response.data)
    setMeta(response.meta)
    setLinks(response.links)
  }

  useEffect(() => {
    getExpenses()
  }, [])

  return (
    <div className="container mx-auto px-8 sm:px-16">
      <Header />
      <ExpenseListHeader />

      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">item</TableHead>
            <TableHead className="text-center">amount</TableHead>
            <TableHead className="text-center">purchased at</TableHead>
            <TableHead className="text-center">action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {expenses.map((item: expense) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">
                {item.attributes.item}
              </TableCell>

              <TableCell className="text-center">
                {item.attributes.amount_in_cents / 100} {item.attributes.currency}
              </TableCell>

              <TableCell className="text-center">
                {new Date(item.attributes.purchased_at).toDateString()}
              </TableCell>

              <TableCell className="text-center">
                <Button size="sm" variant="destructive">
                  delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="items-center gap-4 pt-8">
        <div className="text-sm">Page {page ? page : 1} of {meta.total}</div>

        <PaginationContent>
          <PaginationItem>
            <PaginationFirst href={links.first ? links.first : "#"} className={links.first ? "" : "cursor-default pointer-events-none"} />
          </PaginationItem>

          <PaginationItem>
            <PaginationPrevious href={links.prev ? links.prev : "#"} className={links.prev ? "" : "cursor-default pointer-events-none"} />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext href={links.next ? links.next : "#"} className={links.next ? "" : "cursor-default pointer-events-none"} />
          </PaginationItem>

          <PaginationItem>
            <PaginationLast href={links.last ? links.last : "#"} className={links.last ? "" : "cursor-default pointer-events-none"} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
