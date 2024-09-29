"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { expenseFormSchema } from "@/schemas/expense-form-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type ExpensePurchasedAtFormFieldProps = {
  form: UseFormReturn<z.infer<typeof expenseFormSchema>>
}

const ExpensePurchasedAtFormField = ({ form }: ExpensePurchasedAtFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="purchased_at"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="font-normal">
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span className="text-muted-foreground">
                      when did you make the purchase?
                    </span>
                  )}

                  <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ExpensePurchasedAtFormField
