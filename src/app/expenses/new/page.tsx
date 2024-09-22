"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronsUpDown } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import cc from "currency-codes"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { CommandEmpty, CommandList } from "cmdk";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  item: z.string().min(1),
  amount: z.number().multipleOf(0.01),
  currency: z.string().min(1),
  purchasedAt: z.date()
});

export default function Expense() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: "",
      amount: undefined,
      currency: "",
      purchasedAt: undefined
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto px-8 sm:px-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
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

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" placeholder="amount" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                </FormControl>

                <FormDescription>
                  how much
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox">
                        {field.value
                          ? cc.codes().find((currency) => currency === field.value)
                          : "currency"}
                        <ChevronsUpDown />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent>
                      <Command>
                        <CommandInput placeholder="search currency" />

                        <CommandList>
                          <CommandEmpty>no currency found</CommandEmpty>

                          <CommandGroup>
                            {cc.codes().map((currency) => (
                              <CommandItem value={currency} key={currency} onSelect={(value) => {
                                form.setValue("currency", value)
                              }}>
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

          <FormField
            control={form.control}
            name="purchasedAt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>when did you make the purchase?</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-6">
            create
          </Button>
        </form>
      </Form>
    </div>
  )
}
