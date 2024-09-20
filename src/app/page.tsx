"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto flex h-screen flex-col px-8 sm:px-16">
      <div className="my-auto flex flex-col gap-16">
        <div className="text-6xl tracking-widest sm:text-8xl">
          yet another expense tracker
        </div>

        <div className="flex flex-col gap-8 sm:flex-row">
          <Button size={window.innerWidth >= 1024 ? "lg" : "default"}>
            register
          </Button>

          <Button
            variant="secondary"
            size={window.innerWidth >= 1024 ? "lg" : "default"}
          >
            login
          </Button>
        </div>
      </div>
    </div>
  );
}
