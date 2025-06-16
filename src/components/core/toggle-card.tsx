import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";

interface ToggleCardProps {
  className?: string;
  label: string;
  information: string;
  checked: boolean;
  onCheckedChange?: (value: boolean) => void;
  toggleDisabled?: boolean;
}

const ToggleCard = (props: ToggleCardProps) => {
  return (
    <Card className={cn(props.className, "p-0")}>
      <div className="flex flex-col md:flex-row">
        <div className="w-full flex flex-col justify-center px-10 py-10">
          <p className="font-semibold text-xl text-gray-700">{props.label}</p>
          <p className="text-gray-500">{props.information ?? "N/A"}</p>
        </div>
        <Separator orientation="vertical" className=" hidden md:block" />
        <Separator orientation="horizontal" className=" md:hidden block" />
        <div className="bg-gray-100 md:w-96 flex items-center justify-center p-10">
          <Switch
            disabled={props.toggleDisabled ?? false}
            checked={props.checked}
            onCheckedChange={props.onCheckedChange}
          />
        </div>
      </div>
    </Card>
  );
};

export default ToggleCard;
