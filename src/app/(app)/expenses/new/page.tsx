"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { getToken } from "@/utils/auth";
import { expenseFormSchema } from "@/schemas/expense-form-schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ExpenseItemFormField from "@/components/expenses/new/expense-item-form-field";
import ExpenseAmountFormField from "@/components/expenses/new/expense-amount-form-field";
import ExpenseCurrencyFormField from "@/components/expenses/new/expense-currency-form-field";
import ExpensePurchasedAtFormField from "@/components/expenses/new/expense-purchased-at-form-field";
import Link from "next/link";
import withAuth from "@/components/with-auth";

const Expense = () => {
  const form = useForm<z.infer<typeof expenseFormSchema>>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      item: "",
      amount: 0,
      currency: "",
      purchased_at: undefined,
    },
  });

  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function onSubmit(values: z.infer<typeof expenseFormSchema>) {
    const token = getToken();

    if (!token) {
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/expenses`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expense: values }),
      },
    );

    if (response.ok) {
      router.push("/expenses");
    } else {
      console.error("something went wrong: ", response);
    }
  }

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col px-8 sm:px-16">
      <div className="my-auto pb-32">
        <div className="text-center text-6xl sm:text-8xl">expense</div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-16 flex flex-col gap-6"
          >
            <ExpenseItemFormField form={form} />

            <div className="flex gap-6">
              <ExpenseAmountFormField form={form} />
              <ExpenseCurrencyFormField form={form} open={open} setOpen={setOpen} />
            </div>

            <ExpensePurchasedAtFormField form={form} />

            <Button type="submit" className="mt-6">
              create
            </Button>
          </form>
        </Form>

        <Button variant="secondary" className="mt-6 w-full">
          <Link href="/expenses" className="w-full">
            cancel
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default withAuth(Expense);
