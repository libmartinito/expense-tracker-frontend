import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function Expenses() {
  const response = await fetch("http://127.0.0.1:4010/expenses").then((res) => res.json())

  return (
    <div className="container mx-auto px-8 max-w-3xl sm:px-16">
      <div className="text-center text-6xl sm:text-8xl">expenses</div>

      <Table className="mt-16">
        <TableHeader>
          <TableRow>
            <TableHead>item</TableHead>
            <TableHead>amount</TableHead>
            <TableHead>purchased at</TableHead>
            <TableHead>action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {response.data.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.attributes.item}</TableCell>
              <TableCell>{item.attributes.amount} {item.attributes.currency}</TableCell>
              <TableCell>{new Date(item.attributes.purchased_at).toDateString()}</TableCell>
              <TableCell>
                <Button size="sm" variant="destructive">delete</Button>
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
  )
}
