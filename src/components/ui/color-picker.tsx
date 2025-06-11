import * as React from "react";
import { HexColorPicker } from "react-colorful";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(value);

  React.useEffect(() => {
    setInternal(value);
  }, [value]);

  function handleChange(color: string) {
    setInternal(color);
    onChange(color);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("h-9 w-9 p-0 border", className)}
          style={{ backgroundColor: internal }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-60" align="start">
        <div className="flex flex-col gap-2">
          <HexColorPicker color={internal} onChange={handleChange} className="rounded-md" />
          <Input
            value={internal}
            onChange={(e) => handleChange(e.target.value)}
            className="h-8 text-center font-mono"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { ColorPicker };
