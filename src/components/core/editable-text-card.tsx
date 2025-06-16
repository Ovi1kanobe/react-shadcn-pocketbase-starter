import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
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
  return (
    <Card className="flex flex-col">
      <div className="p-4 space-y-2">
        <Label>{label}</Label>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
        )}
      </div>
      <Separator />
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex flex-row h-24 items-center", disabled && "cursor-not-allowed")}>
            <div className="w-40 flex items-center justify-center">
              <p className="text-sm">New {label}</p>
            </div>
            <div className="flex-1 bg-gray-100 flex items-center justify-center p-4">
              <Input value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
            </div>
          </div>
        </TooltipTrigger>
        {disabled && disabledReason && (
          <TooltipContent side="bottom">
            <p>{disabledReason}</p>
          </TooltipContent>
        )}
      </Tooltip>
      <Separator />
      <div className="p-4 flex justify-end">
        <Button onClick={onSave} disabled={disabled}>
          Save
        </Button>
      </div>
    </Card>
  );
}

export default EditableTextCard;
