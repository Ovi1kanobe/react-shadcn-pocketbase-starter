import { Navigate, Outlet } from "react-router";
import { CreditCard, User, LogOut, User2Icon, ChevronDown, Settings } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import PopoverMenuItem from "@/components/core/popover-menu-item";

import { useAuth } from "@/hooks/useAuth";
import AppSidebar from "@/components/core/app-sidebar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { userSidebarRoutes } from "@/lib/routes";

function UserHeader() {
  const { user } = useAuth();
  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <div className="flex flex-row space-x-2 items-end justify-start hover:bg-gray-100 rounded-sm p-2 cursor-pointer hover:scale-105 transition-all group/header overflow-hidden">
          <User2Icon size={18} className="shrink-0" />
          <p className="text-sm text-muted-foreground truncate overflow-hidden whitespace-nowrap min-w-0">
            {user?.username ?? user?.email}
          </p>
          <ChevronDown
            size={18}
            className="group-hover/header:translate-y-1 transition-all shrink-0"
          />
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
  const sidebar = useSidebar();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen w-screen bg-background">
      <AppSidebar items={userSidebarRoutes} header={<UserHeader />} />
      <div className="flex flex-1 flex-col w-full h-full">
        <SidebarTrigger
          className={cn(
            "absolute left-2 top-2 z-30",
            !sidebar.isMobile && sidebar.open && "hidden"
          )}
        />
        <main className="flex flex-1 flex-col items-center w-full h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default UserLayout;
