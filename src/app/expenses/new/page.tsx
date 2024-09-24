"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CommandEmpty, CommandList } from "cmdk";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import { getToken } from "@/utils/auth";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import cc from "currency-codes";

const formSchema = z.object({
  item: z.string().min(1),
  amount: z.number().multipleOf(0.01),
  currency: z.string().min(1, "Please choose a currency"),
  purchased_at: z.date(),
});

export default function Expense() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: "",
      amount: 0,
      currency: "",
      purchased_at: undefined,
    },
  });

  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch("http://localhost:3000/v1/expenses", {
      method: "POST",
      headers: {
        Authorization: getToken() as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expense: values }),
    });

    if (response.ok) {
      router.push("/expenses");
    } else {
      console.error("something went wrong: ", response);
    }
  }

  return (
    <div className="container mx-auto flex h-screen max-w-3xl flex-col px-8 sm:px-16">
      <div className="my-auto flex flex-col gap-16">
        <div className="text-center text-6xl sm:text-8xl">expense</div>

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

            <div className="flex gap-6">
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
            </div>

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

            <Button type="submit" className="mt-6">
              create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
