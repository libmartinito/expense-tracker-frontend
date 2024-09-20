"use client"

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container border-2 border-red-500 h-screen mx-auto flex flex-col px-8 sm:px-16">
      <div className="my-auto flex flex-col gap-16">
        <div className="tracking-widest text-6xl sm:text-8xl">yet another expense tracker</div>
        <div className="flex gap-8 flex-col sm:flex-row">
          <Button size={window.innerWidth >= 1024 ? "lg" : "default"}>register</Button>
          <Button variant="secondary" size={window.innerWidth >= 1024 ? "lg" : "default"}>login</Button>
        </div>
      </div>
    </div>
  );
}
