"use client"

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function ExpenseListHeader() {
  return (
    <div className="mt-16 flex items-center justify-between">
      <div className="text-3xl">expenses</div>
      <div className="flex gap-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="month" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="january">january</SelectItem>
              <SelectItem value="february">february</SelectItem>
              <SelectItem value="march">march</SelectItem>
              <SelectItem value="april">april</SelectItem>
              <SelectItem value="may">may</SelectItem>
              <SelectItem value="june">june</SelectItem>
              <SelectItem value="july">july</SelectItem>
              <SelectItem value="august">august</SelectItem>
              <SelectItem value="september">september</SelectItem>
              <SelectItem value="october">october</SelectItem>
              <SelectItem value="november">november</SelectItem>
              <SelectItem value="december">december</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="year" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button>
          <Link href="/expenses/new">create</Link>
        </Button>
      </div>
    </div>
  )
}
