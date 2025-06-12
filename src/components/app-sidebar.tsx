import { Home, CreditCard, User, LogOut, User2Icon } from "lucide-react";
import { Link, useLocation } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const items = [
  { title: "Home", to: "/", icon: Home },
  { title: "Account", to: "/account", icon: CreditCard },
  { title: "Profile", to: "/profile", icon: User },
  { title: "Logout", to: "/logout", icon: LogOut },
];

export function AppSidebar() {
  const { user } = useAuth();
  //get current route with react-router-dom
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-row space-x-2 items-end justify-start hover:bg-gray-100 rounded-sm p-2 cursor-pointer hover:scale-105 transition-all">
          <User2Icon />
            <p className="text-sm text-muted-foreground">
              {user?.username ?? user?.email}
            </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={cn("transition-all duration-400", location.pathname === item.to ? "bg-gray-100" : "hover:translate-x-4")}>
                    <Link to={item.to}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
