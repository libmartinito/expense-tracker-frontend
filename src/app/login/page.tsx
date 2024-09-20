"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(3),
  password_confirmation: z.string().min(3)
})

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="container max-w-3xl border border-red-500 mx-auto flex h-screen flex-col px-8 sm:px-16">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>

                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>

                <FormDescription>
                  this is what you'd be called
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>

                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>

                <FormDescription>
                  this is your unique identifier
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>

                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>

                <FormDescription>
                  this is how you let us know you're you
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password confirmation</FormLabel>

                <FormControl>
                  <Input placeholder="password_confirmation" {...field} />
                </FormControl>

                <FormDescription>
                  just to be sure
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">submit</Button>
        </form>
      </Form>
    </div>
  )
}
