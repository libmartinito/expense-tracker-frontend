"use client"

import { expenseFormSchema } from "@/schemas/expense-form-schema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type ExpenseAmountFormFieldProps = {
  form: UseFormReturn<z.infer<typeof expenseFormSchema>>
}

const ExpenseAmountFormField = ({ form }: ExpenseAmountFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type="number"
              placeholder="amount"
              {...field}
              onChange={(e) =>
                field.onChange(parseFloat(e.target.value))
              }
            />
          </FormControl>

          <FormDescription>how much</FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ExpenseAmountFormField
