import { Navigate, Outlet } from "react-router";
import { Home, CreditCard, User, LogOut, User2Icon } from "lucide-react";

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
    <div className="flex flex-row space-x-2 items-end justify-start hover:bg-gray-100 rounded-sm p-2 cursor-pointer hover:scale-105 transition-all">
      <User2Icon />
      <p className="text-sm text-muted-foreground">{user?.username ?? user?.email}</p>
    </div>
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
