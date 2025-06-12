import { Navigate, Outlet, Link } from "react-router";
import { Home, CreditCard, User, LogOut, User2Icon, Settings } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SidebarHeaderItem from "@/components/sidebar-header-item";

import { useAuth } from "@/hooks/useAuth";
import AppSidebar, { type NavItem } from "@/components/app-sidebar";

const navItems: NavItem[] = [
  { title: "Home", to: "/", icon: Home },
  { title: "Account", to: "/account", icon: CreditCard },
  { title: "Profile", to: "/profile", icon: User },
  { title: "Logout", to: "/logout", icon: LogOut },
];

function UserHeader() {
  const { user } = useAuth();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <SidebarHeaderItem
          className="w-full"
          icon={User2Icon}
          label={user?.username ?? user?.email}
        />
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

function UserLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
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
