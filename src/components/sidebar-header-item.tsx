import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarHeaderItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  label: string | null | undefined;
}

function SidebarHeaderItem({ icon: Icon, label, className, ...props }: SidebarHeaderItemProps) {
  return (
    <div
      className={cn(
        "flex flex-row space-x-2 items-end justify-start hover:bg-gray-100 rounded-sm p-2 cursor-pointer hover:scale-105 transition-all group/header",
        className
      )}
      {...props}
    >
      <Icon />
      <p className="text-sm text-muted-foreground">{label}</p>
      <ChevronDown className="h-3/4 group-hover/header:translate-y-1 transition-all" />
    </div>
  );
}

export default SidebarHeaderItem;
