import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ExpensesHeaderMonthSelectionProps = {
  month: string,
  setMonth: Dispatch<SetStateAction<string>>
}

const ExpensesHeaderMonthSelection = ({ month, setMonth }: ExpensesHeaderMonthSelectionProps) => {
  return (
    <Select defaultValue={month} onValueChange={setMonth}>
      <SelectTrigger>
        <SelectValue placeholder="month" />
      </SelectTrigger>

      <SelectContent className="max-h-64">
        <SelectGroup>
          <SelectItem value="01">january</SelectItem>
          <SelectItem value="02">february</SelectItem>
          <SelectItem value="03">march</SelectItem>
          <SelectItem value="04">april</SelectItem>
          <SelectItem value="05">may</SelectItem>
          <SelectItem value="06">june</SelectItem>
          <SelectItem value="07">july</SelectItem>
          <SelectItem value="08">august</SelectItem>
          <SelectItem value="09">september</SelectItem>
          <SelectItem value="10">october</SelectItem>
          <SelectItem value="11">november</SelectItem>
          <SelectItem value="12">december</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default ExpensesHeaderMonthSelection
