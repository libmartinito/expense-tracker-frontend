"use client"

import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import ExpensesHeaderMonthSelection from "./expenses-header-month-selection";
import ExpensesHeaderYearSelection from "./expenses-header-year-selection";
import Link from "next/link";
import type { meta } from "@/app/(app)/expenses/page";

type ExpensesHeaderProps = {
  month: string,
  setMonth: Dispatch<SetStateAction<string>>
  year: string,
  setYear: Dispatch<SetStateAction<string>>,
  meta: meta
}

const ExpensesHeader = ({ month, setMonth, year, setYear, meta }: ExpensesHeaderProps) => {
  return (
    <>
      <div className="mt-16 flex items-center justify-between">
        <div className="text-3xl">expenses</div>

        <div className="flex gap-4">
          <ExpensesHeaderMonthSelection month={month} setMonth={setMonth} />
          <ExpensesHeaderYearSelection year={year} setYear={setYear} meta={meta} />

          <Button>
            <Link href="/expenses/new">create</Link>
          </Button>
        </div>
      </div>

      <div className="mt-2">
        total amount: {((meta.total_amount_in_cents || 0) / 100).toFixed(2)}
      </div>
    </>
  )
}

export default ExpensesHeader
