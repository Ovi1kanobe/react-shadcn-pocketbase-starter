import { Link, Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

function UserLayout() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b p-4">
        <Link to="/" className="font-semibold">
          Home
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

export default UserLayout;
