"use client";

import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setToken, setUserId } from "@/utils/auth";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: values }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      setUserId(data.data.id);
      setToken(data.data.attributes.token);
      router.push("/expenses");
    } else {
      console.error("something went wrong: ", response);
    }
  }

  return (
    <div className="container mx-auto flex h-screen max-w-3xl flex-col px-8 sm:px-16">
      <div className="my-auto pb-32">
        <div className="mt-8 text-center text-6xl sm:text-8xl">login</div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-16 flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>

                  <FormDescription>your unique identifier</FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>

                  <FormDescription>
                    how you let us know you&apos;re you
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-6">
              login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
