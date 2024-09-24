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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/header";
import Link from "next/link";

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

export type meta = {
  total?: number
  total_amount_in_cents?: number
  years?: number[]
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
  const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString().padStart(2, "0"))
  const [links, setLinks] = useState<links>({})
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())
  const searchParams = useSearchParams()

  const page = searchParams.get("page")
  const perPage = searchParams.get("per_page")

  const deleteExpense = async (id: number) => {
    const backendUrl = "http://localhost:3000/v1/expenses"

    await fetch(`${backendUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": getToken() as string
      }
    })

    window.location.reload()
  }

  const getExpenses = async () => {
    const backendUrl = "http://localhost:3000/v1/expenses"
    const queryParams = new URLSearchParams()

    if (page) {
      queryParams.append("page", page)
    }

    if (perPage) {
      queryParams.append("per_page", perPage)
    }

    queryParams.append("month", month)
    queryParams.append("year", year)

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
  }, [month, year])

  return (
    <div className="container mx-auto px-8 sm:px-16">
      <Header />

      <div className="mt-16 flex items-center justify-between">
        <div className="text-3xl">expenses</div>

        <div className="flex gap-4">
          <Select defaultValue={month} onValueChange={setMonth}>
            <SelectTrigger>
              <SelectValue placeholder="month" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="01">january</SelectItem>
                <SelectItem value="02">february</SelectItem>
                <SelectItem value="03">march</SelectItem>
                <SelectItem value="04">april</SelectItem>
                <SelectItem value="05">may</SelectItem>
                <SelectItem value="06">june</SelectItem>
                <SelectItem value="07">july</SelectItem>
                <SelectItem value="08">august</SelectItem>
                <SelectItem value="09">september</SelectItem>
                <SelectItem value="10">october</SelectItem>
                <SelectItem value="11">november</SelectItem>
                <SelectItem value="12">december</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select defaultValue={year} onValueChange={setYear}>
            <SelectTrigger>
              <SelectValue placeholder="year" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {meta.years?.map((year) => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button>
            <Link href="/expenses/new">create</Link>
          </Button>
        </div>
      </div>

      <div className="mt-2">total amount: {((meta.total_amount_in_cents || 0) / 100).toFixed(2)}</div>

      <Table className="mt-6">
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
                {(item.attributes.amount_in_cents / 100).toFixed(2)} {item.attributes.currency}
              </TableCell>

              <TableCell className="text-center">
                {new Date(item.attributes.purchased_at).toDateString()}
              </TableCell>

              <TableCell className="text-center">
                <Button size="sm" variant="destructive" onClick={() => deleteExpense(item.id)}>
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
