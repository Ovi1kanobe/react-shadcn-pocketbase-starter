import { Home, CreditCard, User, LogOut } from "lucide-react";
import { Link } from "react-router";

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
import { Avatar } from "./ui/avatar";
import { useAuth } from "@/hooks/useAuth";

const items = [
  { title: "Home", to: "/", icon: Home },
  { title: "Account", to: "/account", icon: CreditCard },
  { title: "Profile", to: "/profile", icon: User },
  { title: "Logout", to: "/logout", icon: LogOut },
];

export function AppSidebar() {
  const { user } = useAuth();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-row">
          <Avatar className="" />
          <div className="flex flex-row">
            {/* Display avatar and make a loading animation until user shows up*/}
            <p className="text-sm text-muted-foreground">
              {user?.username ?? user?.email}'s account
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
