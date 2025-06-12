import { Link, Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

function UserLayout() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <Link to="/" className="font-semibold">
                Home
              </Link>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Log out
            </Button>
          </header>
          <main className="flex flex-1 flex-col items-center">
            <Outlet />
          </main>
        </div>
      </div>
  );
}

export default UserLayout;
