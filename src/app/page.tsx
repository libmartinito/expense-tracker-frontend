"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

const Home = () => {
  return (
    <div className="container mx-auto flex h-screen flex-col px-8 sm:px-16">
      <div className="flex justify-end">
        <ThemeToggle className="my-8" />
      </div>

      <div className="flex h-full">
        <div className="my-auto grow">
          <div className="text-6xl tracking-widest sm:text-8xl">
            yet another expense tracker
          </div>

          <div className="mt-16 flex flex-col gap-8 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/register">register</Link>
            </Button>

            <Button variant="secondary" size="lg" asChild>
              <Link href="/login">login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
