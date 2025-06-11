import { Link, Navigate, Outlet } from "react-router";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";

function AdminLayout() {
  const { admin, logout } = useAdminAuth();

  if (!admin) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b p-4">
        <Link to="/admin" className="font-semibold">
          Admin Panel
        </Link>
        <Button variant="outline" size="sm" onClick={logout}>
          Log out
        </Button>
      </header>
      <main className="flex flex-1 flex-col items-center">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
