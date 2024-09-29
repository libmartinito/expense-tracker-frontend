"use client"

import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CommandEmpty, CommandList } from "cmdk";
import { Dispatch, SetStateAction } from "react";
import { expenseFormSchema } from "@/schemas/expense-form-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import cc from "currency-codes";

type ExpenseCurrencyFormFieldProps = {
  form: UseFormReturn<z.infer<typeof expenseFormSchema>>
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ExpenseCurrencyFormField = ({ form, open, setOpen }: ExpenseCurrencyFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="currency"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="font-normal"
                >
                  {field.value ? (
                    cc
                      .codes()
                      .find((currency) => currency === field.value)
                  ) : (
                    <span className="text-muted-foreground">
                      currency
                    </span>
                  )}

                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent>
                <Command>
                  <CommandInput placeholder="search currency" />

                  <CommandList>
                    <CommandEmpty>no currency found</CommandEmpty>

                    <CommandGroup className="max-h-32 overflow-y-scroll">
                      {cc.codes().map((currency) => (
                        <CommandItem
                          value={currency}
                          key={currency}
                          onSelect={(value) => {
                            form.setValue("currency", value);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              form.getValues("currency") === currency
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {currency}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ExpenseCurrencyFormField
