import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface EditableTextCardProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
}

function EditableTextCard({ label, value, onChange, onSave }: EditableTextCardProps) {
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
      <div className="flex flex-row gap-4 items-center relative cursor-pointer">
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
        >
          {locked ? "Change" : "Save"}
        </Button>
      </div>
    </Card>
  );
}

export default EditableTextCard;
