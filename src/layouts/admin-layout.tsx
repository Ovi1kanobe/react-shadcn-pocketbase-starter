import { Navigate, Outlet } from "react-router";
import { useAdminAuth } from "@/hooks/useAdminAuth";

function AdminLayout() {
  const { admin } = useAdminAuth();

  if (!admin) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
