import { Navigate, Outlet } from "react-router";
import { Home, LogOut, User2Icon, User, CreditCard, Settings } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SidebarHeaderItem from "@/components/sidebar-header-item";
import { Link } from "react-router";

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
      <PopoverTrigger asChild>
        <SidebarHeaderItem className="w-full" icon={User2Icon} label={admin?.email} />
      </PopoverTrigger>
      <PopoverContent className="p-1 ml-2 space-y-1">
        <Link
          to="/profile"
          className="hover:bg-gray-100 flex items-center gap-2 rounded-sm p-2 transition-all"
        >
          <User className="size-4" />
          <span>Profile</span>
        </Link>
        <Link
          to="/account"
          className="hover:bg-gray-100 flex items-center gap-2 rounded-sm p-2 transition-all"
        >
          <CreditCard className="size-4" />
          <span>Account</span>
        </Link>
        <Link
          to="/settings"
          className="hover:bg-gray-100 flex items-center gap-2 rounded-sm p-2 transition-all"
        >
          <Settings className="size-4" />
          <span>Settings</span>
        </Link>
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
