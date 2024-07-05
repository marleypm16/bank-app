import { Select, SelectContent, SelectTrigger, SelectValue,SelectItem } from "@/app/_components/ui/select";
import { states } from "@/app/_mock/states";
interface SelectStateProps {
    state: string;
    handleSelect: (state: string) => void;
}
const SelectState = ({state,handleSelect}:SelectStateProps) => {
    const onSelect = (value: string) => {
        handleSelect(value)
    }
    return(
        <Select onValueChange={onSelect} value={state}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
                {states.map((state) => (
                    <SelectItem key={state.sigla} value={state.sigla}>{state.sigla}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
export default SelectState;