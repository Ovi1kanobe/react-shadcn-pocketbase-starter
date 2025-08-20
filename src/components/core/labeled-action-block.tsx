import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface LabeledActionBlockProps {
  title: string;
  actionLabel: string;
  onActionClick: () => void;
  description?: string;
  disabled?: boolean;
  disabledReason?: string;
}

export default function LabeledActionBlock({
  title,
  description,
  actionLabel,
  onActionClick,
  disabled = false,
  disabledReason = "This action is currently unavailable.",
}: LabeledActionBlockProps) {
  return (
    <Card className="flex flex-col md:flex-row p-0">
      <div className="flex flex-col md:flex-row p-0 w-full">
        <div className="flex flex-col w-full justify-center px-10 py-10 space-y-2">
          <p className="font-semibold text-xl text-gray-700">{title}</p>
          {description && <p className="text-gray-500">{description}</p>}
        </div>
        <Separator orientation="vertical" className=" hidden md:block" />
        <Separator orientation="horizontal" className=" md:hidden block" />
        <Tooltip>
          <TooltipTrigger asChild className={cn(disabled && "cursor-not-allowed")}>
            <div className="md:w-96 p-10 bg-secondary/20 flex items-center justify-center rounded-r-xl">
              <Button onClick={onActionClick} disabled={disabled} className="">
                {actionLabel}
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent className={cn(!disabled && "hidden")}>
            <p>{disabledReason}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Card>
  );
}
