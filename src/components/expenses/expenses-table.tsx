"use client"

import { Button } from "@/components/ui/button";
import { getToken } from "@/utils/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { expense } from "@/app/(app)/expenses/page";

type ExpensesTableProps = {
  expenses: expense[]
}

const ExpensesTable = ({ expenses }: ExpensesTableProps) => {
  const deleteExpense = async (id: number) => {
    const token = getToken();

    if (!token) {
      return;
    }

    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/expenses`;

    await fetch(`${backendUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
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
              {(item.attributes.amount_in_cents / 100).toFixed(2)}{" "}
              {item.attributes.currency}
            </TableCell>

            <TableCell className="text-center">
              {new Date(item.attributes.purchased_at).toDateString()}
            </TableCell>

            <TableCell className="text-center">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => deleteExpense(item.id)}
              >
                delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ExpensesTable
