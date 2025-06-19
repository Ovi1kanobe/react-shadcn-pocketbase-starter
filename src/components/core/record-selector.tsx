import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------
 * Generic props
 * ---------------------------------------------------------- */
type SelectorProps<T extends { id: string }> = {
  /** list of records to pick from */
  data: T[];
  /** currently-selected record (or null) */
  value: T | null;
  /** state setter supplied by the parent */
  setValue: (v: T | null) => void;
  /**
   * returns the string that should be shown for an item
   * (e.g. item.name, item.email, `${item.first} ${item.last}`, …)
   */
  label: (item: T) => string;
  /** optional placeholder text */
  placeholder?: string;
  /** optional extra class(es) for the trigger button */
  className?: string;
};

/* ------------------------------------------------------------
 * Generic record selector
 * ---------------------------------------------------------- */
export function RecordSelector<T extends { id: string }>({
  data,
  value,
  setValue,
  label,
  placeholder = "Select…",
  className,
}: SelectorProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* ---------- trigger ---------- */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {value ? label(value) : placeholder}
          <ChevronsUpDown className="ml-2 size-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>

      {/* ---------- content ---------- */}
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search…" className="h-9" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => {
                const text = label(item);
                const selected = value?.id === item.id;

                return (
                  <CommandItem
                    key={item.id}
                    value={text} // searched text
                    onSelect={() => {
                      setValue(selected ? null : item);
                      setOpen(false);
                    }}
                  >
                    {text}
                    <Check className={cn("ml-auto", selected ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
