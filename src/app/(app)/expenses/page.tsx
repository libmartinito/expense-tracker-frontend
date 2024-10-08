"use client";

import { getToken } from "@/utils/auth";
import { useCallback, useEffect, useState } from "react";
import ExpensesPagination from "@/components/expenses/expenses-pagination";
import ExpensesTable from "@/components/expenses/expenses-table";
import ExpensesHeader from "@/components/expenses/expenses-header";
import withAuth from "@/components/with-auth";

export type expense = {
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
  current_page?: number;
  total_pages?: number;
  total_amount_in_cents?: number;
  years?: number[];
};

export type links = {
  first?: string;
  last?: string;
  prev?: string;
  next?: string;
};

type expenses = {
  data: expense[];
  meta: meta;
  links: links;
};

const Expenses = () => {
  const [expenses, setExpenses] = useState<expense[]>([]);
  const [meta, setMeta] = useState<meta>({});
  const [month, setMonth] = useState<string>(
    (new Date().getMonth() + 1).toString().padStart(2, "0"),
  );
  const [links, setLinks] = useState<links>({});
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());

  const getExpenses = useCallback(
    async (link: string | undefined = undefined) => {
      const token = getToken();

      if (!token) {
        return;
      }

      const backendUrl = new URL(
        link || `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/expenses`,
      );
      backendUrl.searchParams.set("month", month);
      backendUrl.searchParams.set("year", year);

      const response: expenses = await fetch(`${backendUrl}`, {
        headers: {
          Authorization: token,
        },
      }).then((res) => res.json());

      setExpenses(response.data);
      setMeta(response.meta);
      setLinks(response.links);
    },
    [month, year],
  );

  useEffect(() => {
    getExpenses();
  }, [month, year, getExpenses]);

  return (
    <>
      <ExpensesHeader
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        meta={meta}
      />

      <ExpensesTable
        expenses={expenses}
        meta={meta}
        getExpenses={getExpenses}
      />

      {!!meta.total_pages && meta.total_pages > 0 && (
        <ExpensesPagination
          page={meta.current_page}
          meta={meta}
          links={links}
          getExpenses={getExpenses}
        />
      )}
    </>
  );
};

export default withAuth(Expenses);
