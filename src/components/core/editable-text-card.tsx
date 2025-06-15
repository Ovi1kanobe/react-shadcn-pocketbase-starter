import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface EditableTextCardProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  description?: string;
  disabled?: boolean;
  disabledReason?: string;
}

function EditableTextCard({
  label,
  value,
  onChange,
  onSave,
  description,
  disabled = false,
  disabledReason,
}: EditableTextCardProps) {
  const [locked, setLocked] = useState(true);

  function handleButtonClick() {
    if (locked) {
      setLocked(false);
    } else {
      onSave();
      setLocked(true);
    }
  }

  return (
    <Card className="p-4 flex flex-col ">
      <Label>{label}</Label>
      {description && (
        <CardDescription className="text-sm text-muted-foreground mb-2">
          {description}
        </CardDescription>
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex flex-row gap-4 items-center relative",
              disabled == true && "cursor-not-allowed"
            )}
          >
            <Input
              onClick={() => setLocked(false)}
              value={value}
              disabled={locked}
              onChange={(e) => onChange(e.target.value)}
              className={cn("w-full transition-all duration-500")}
            />

            <Button
              onClick={handleButtonClick}
              variant={"default"}
              className={cn("overflow-hidden transition-all duration-500")}
              disabled={disabled}
            >
              {locked ? "Change" : "Save"}
            </Button>
          </div>
        </TooltipTrigger>
        {disabled && disabledReason && (
          <TooltipContent side="bottom">
            <p>{disabledReason}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </Card>
  );
}

export default EditableTextCard;
