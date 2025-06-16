import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Input
              placeholder={`New ${label.toLowerCase()}`}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
            />
          </TooltipTrigger>
          {disabled && disabledReason && (
            <TooltipContent side="bottom">
              <p>{disabledReason}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={onSave} disabled={disabled}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}

export default EditableTextCard;
