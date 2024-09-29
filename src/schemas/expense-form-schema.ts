import { z } from "zod";

export const expenseFormSchema = z.object({
  item: z.string().min(1),
  amount: z.number().multipleOf(0.01),
  currency: z.string().min(1, "Please choose a currency"),
  purchased_at: z.date(),
});
