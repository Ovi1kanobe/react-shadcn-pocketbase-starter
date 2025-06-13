import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";

interface PopoverMenuItemProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

function PopoverMenuItem({ to, icon: Icon, children }: PopoverMenuItemProps) {
  return (
    <Link
      to={to}
      className="hover:bg-gray-100 rounded-sm p-2 cursor-pointer transition-all flex items-center space-x-2"
    >
      <Icon className="size-4" />
      <span>{children}</span>
    </Link>
  );
}

export default PopoverMenuItem;
