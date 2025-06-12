import { Navigate, Outlet } from "react-router";
import { ChevronDown, Home, LogOut, User2Icon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import AppSidebar, { type NavItem } from "@/components/app-sidebar";

const navItems: NavItem[] = [
  { title: "Home", to: "/admin", icon: Home },
  { title: "Logout", to: "/logout", icon: LogOut },
];

function AdminHeader() {
  const { admin } = useAdminAuth();
  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <div className="flex flex-row space-x-2 items-end justify-start hover:bg-gray-100 rounded-sm p-2 cursor-pointer hover:scale-105 transition-all group/header">
          <User2Icon />
          <p className="text-sm text-muted-foreground">{admin?.email}</p>
          <ChevronDown className="h-3/4 group-hover/header:translate-y-1 transition-all" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-1  ml-2">
        <div className="hover:bg-gray-100 rounded-sm p-2 cursor-pointer transition-all">
          <p>Settings</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function AdminLayout() {
  const { admin } = useAdminAuth();

  if (!admin) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar items={navItems} header={<AdminHeader />} />
      <div className="flex flex-1 flex-col">
        <main className="flex flex-1 flex-col items-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
