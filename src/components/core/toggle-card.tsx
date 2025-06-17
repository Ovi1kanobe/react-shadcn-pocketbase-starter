import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ToggleCardProps {
  className?: string;
  label: string;
  information: string;
  checked: boolean;
  onCheckedChange?: (value: boolean) => void;
  disabled?: boolean;
  disabledReason?: string;
}

const ToggleCard = ({
  className,
  label,
  information,
  checked,
  onCheckedChange,
  disabled = false,
  disabledReason = "This action is currently unavailable.",
}: ToggleCardProps) => {
  return (
    <Card className={cn(className, "p-0")}>
      <div className="flex flex-col md:flex-row">
        <div className="w-full flex flex-col justify-center px-10 py-10">
          <p className="font-semibold text-xl text-gray-700">{label}</p>
          <p className="text-gray-500">{information ?? "N/A"}</p>
        </div>
        <Separator orientation="vertical" className=" hidden md:block" />
        <Separator orientation="horizontal" className=" md:hidden block" />
        <Tooltip>
          <TooltipTrigger asChild className={cn(disabled && "cursor-not-allowed")}>
            <div className="bg-gray-100 md:w-96 flex items-center justify-center p-10">
              <Switch disabled={disabled} checked={checked} onCheckedChange={onCheckedChange} />
            </div>
          </TooltipTrigger>
          <TooltipContent className={cn(!disabled && "hidden")}>
            <p>{disabledReason}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Card>
  );
};

export default ToggleCard;
