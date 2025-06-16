import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

interface LabeledActionBlockProps {
  title: string;
  actionLabel: string;
  onActionClick: () => void;
  description?: string;
  disabled?: boolean;
}

export default function LabeledActionBlock({
  title,
  description,
  actionLabel,
  onActionClick,
  disabled = false,
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
        <div className="bg-gray-100 p-10 flex items-center justify-center">
          <Button onClick={onActionClick} disabled={disabled} className="">
            {actionLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}
