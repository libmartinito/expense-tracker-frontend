"use client"

import { Button } from "@/components/ui/button";
import { getToken } from "@/utils/auth";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
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

type expenses = {
  data: expense[];
};

export default function Expenses() {
  const [expenses, setExpenses] = useState<expense[]>([])

  useEffect(() => {
    const getExpenses = async () => {
      const response: expenses = await fetch("http://localhost:3000/v1/expenses", {
        headers: {
          "Authorization": getToken() as string
        }
      }).then((res) => res.json())

      setExpenses(response.data)
    }

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

      <Pagination className="pt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
