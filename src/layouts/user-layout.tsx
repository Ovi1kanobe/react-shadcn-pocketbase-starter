import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";

import AppSidebar from "@/components/app-sidebar";

function UserLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <main className="flex flex-1 flex-col items-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default UserLayout;
