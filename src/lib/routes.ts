import type { NavItem } from "@/components/core/app-sidebar";
import { Database, Home } from "lucide-react";

export const adminSidebarRoutes: NavItem[] = [
  { title: "Home", to: "/admin", icon: Home },
  { title: "Collections", to: "/admin/collections", icon: Database },
];

export const userSidebarRoutes: NavItem[] = [
    { title: "Home", to: "/", icon: Home },
];
