import type { ReactElement } from "react";
import type { NavItem } from "@/components/core/app-sidebar";
import type { LucideIcon } from "lucide-react";
import { Home, Database, List } from "lucide-react";

import Demo from "@/pages/user/home";
import AccountPage from "@/pages/user/account";
import ProfilePage from "@/pages/user/profile";
import SettingsPage from "@/pages/user/settings";
import LoginPage from "@/pages/user/login";
import RegisterPage from "@/pages/user/register";
import AdminLoginPage from "@/pages/admin/admin-login";
import AdminDemo from "@/pages/admin/admin-home";
import AdminCollections from "@/pages/admin/admin-collections";
import LogoutPage from "@/pages/logout";
import AdminSettingsPage from "@/pages/admin/admin-settings";
import ListPage from "@/pages/user/list";

export interface RouteConfig {
  path: string;
  element: ReactElement;
  sidebar?: { title: string; icon: LucideIcon };
}

export const adminRoutes: RouteConfig[] = [
  {
    path: "/admin",
    element: <AdminDemo />,
    sidebar: { title: "Home", icon: Home },
  },
  {
    path: "/admin/collections",
    element: <AdminCollections />,
    sidebar: { title: "Collections", icon: Database },
  },
  {
    path: "/admin/settings",
    element: <AdminSettingsPage />,
  },
];

export const userRoutes: RouteConfig[] = [
  { path: "/", element: <Demo />, sidebar: { title: "Home", icon: Home } },
  { path: "/loads", element: <ListPage />, sidebar: { title: "List", icon: List } },
  { path: "/account", element: <AccountPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/settings", element: <SettingsPage /> },
];

export const publicRoutes: RouteConfig[] = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/admin-login", element: <AdminLoginPage /> },
  { path: "/logout", element: <LogoutPage /> },
];

export const notFoundRoute: RouteConfig = {
  path: "/404",
  element: <div>404 Not Found</div>,
};

export const adminSidebarRoutes: NavItem[] = adminRoutes
  .filter((r) => r.sidebar)
  .map((r) => ({
    title: r.sidebar!.title,
    to: r.path,
    icon: r.sidebar!.icon,
  }));

export const userSidebarRoutes: NavItem[] = userRoutes
  .filter((r) => r.sidebar)
  .map((r) => ({
    title: r.sidebar!.title,
    to: r.path,
    icon: r.sidebar!.icon,
  }));
