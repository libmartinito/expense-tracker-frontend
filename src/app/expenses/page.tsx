import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

type expense = {
  id: number;
  type: string;
  attributes: {
    item: string;
    amount: number;
    currency: string;
    purchased_at: Date;
    created_at: Date;
    updated_at: Date;
  };
};

type expenses = {
  data: expense[];
};

export default async function Expenses() {
  const response: expenses = await fetch("http://127.0.0.1:4010/expenses").then(
    (res) => res.json(),
  );

  return (
    <div className="container mx-auto px-8 sm:px-16">
      <div className="my-8 flex items-center justify-between">
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/expenses">expenses</Link>
            </li>
            <li>
              <Link href="#">user</Link>
            </li>
          </ul>
        </nav>

        <Button variant="secondary">logout</Button>
      </div>

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

          <Button>create</Button>
        </div>
      </div>

      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">item</TableHead>
            <TableHead className="text-center">amount</TableHead>
            <TableHead className="text-center">purchased at</TableHead>
            <TableHead className="text-center">action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {response.data.map((item: expense) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">
                {item.attributes.item}
              </TableCell>

              <TableCell className="text-center">
                {item.attributes.amount} {item.attributes.currency}
              </TableCell>

              <TableCell className="text-center">
                {new Date(item.attributes.purchased_at).toDateString()}
              </TableCell>

              <TableCell className="text-center">
                <Button size="sm" variant="destructive">
                  delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="pt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
