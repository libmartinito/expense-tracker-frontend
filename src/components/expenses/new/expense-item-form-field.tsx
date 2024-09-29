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

type ExpenseItemFormFieldProps = {
  form: UseFormReturn<z.infer<typeof expenseFormSchema>>
}

const ExpenseItemFormField = ({ form }: ExpenseItemFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="item"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder="item" {...field} />
          </FormControl>

          <FormDescription>thing you spent money on</FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ExpenseItemFormField
