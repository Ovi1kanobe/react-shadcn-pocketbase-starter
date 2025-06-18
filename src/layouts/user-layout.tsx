import { Navigate, Outlet } from "react-router";
import { Home, CreditCard, User, LogOut, User2Icon, ChevronDown, Settings } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import PopoverMenuItem from "@/components/core/popover-menu-item";

import { useAuth } from "@/hooks/useAuth";
import AppSidebar, { type NavItem } from "@/components/core/app-sidebar";
import { Separator } from "@/components/ui/separator";

const navItems: NavItem[] = [{ title: "Home", to: "/", icon: Home }];

function UserHeader() {
  const { user } = useAuth();
  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <div className="flex flex-row space-x-2 items-end justify-start hover:bg-gray-100 rounded-sm p-2 cursor-pointer hover:scale-105 transition-all group/header">
          <User2Icon />
          <p className="text-sm text-muted-foreground">{user?.username ?? user?.email}</p>
          <ChevronDown className="h-3/4 group-hover/header:translate-y-1 transition-all" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-1  ml-2 flex flex-col space-y-1">
        <PopoverMenuItem to="/profile" icon={User}>
          Profile
        </PopoverMenuItem>
        <PopoverMenuItem to="/account" icon={CreditCard}>
          Account
        </PopoverMenuItem>
        <PopoverMenuItem to="/settings" icon={Settings}>
          Settings
        </PopoverMenuItem>
        <Separator />
        <PopoverMenuItem to="/logout" icon={LogOut}>
          Logout
        </PopoverMenuItem>
      </PopoverContent>
    </Popover>
  );
}

function UserLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen w-screen">
      <AppSidebar items={navItems} header={<UserHeader />} />
      <div className="flex flex-1 flex-col">
        <main className="flex flex-1 flex-col items-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default UserLayout;
