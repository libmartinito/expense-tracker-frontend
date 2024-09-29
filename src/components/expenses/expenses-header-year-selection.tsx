import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { meta } from "@/app/(app)/expenses/page";

type ExpensesHeaderYearSelectionProps = {
  year: string,
  setYear: Dispatch<SetStateAction<string>>,
  meta: meta
}

const ExpensesHeaderYearSelection = ({ year, setYear, meta }: ExpensesHeaderYearSelectionProps) => {
  return (
    <Select defaultValue={year} onValueChange={setYear}>
      <SelectTrigger>
        <SelectValue placeholder="year" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {meta.years?.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default ExpensesHeaderYearSelection
