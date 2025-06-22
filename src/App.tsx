import { SyncLoader } from "react-spinners";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import { Navigate, Route, Routes } from "react-router";
import { adminRoutes, userRoutes, publicRoutes, notFoundRoute } from "./lib/routes";
import { useAdminAuth } from "./hooks/useAdminAuth";
import AdminLayout from "./layouts/admin-layout";
import UserLayout from "./layouts/user-layout";

function App() {
  const { user, fetched } = useAuth();
  const { admin, fetched: adminFetched } = useAdminAuth();
  if (!fetched || !adminFetched) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-24 p-4 w-full">
        <SyncLoader
          color="#000000"
          loading={!fetched}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Routes>
        {publicRoutes.map(({ path, element }) => {
          if (path === "/login" || path === "/register") {
            return <Route key={path} path={path} element={user ? <Navigate to="/" /> : element} />;
          }
          if (path === "/admin-login") {
            return (
              <Route key={path} path={path} element={admin ? <Navigate to="/admin" /> : element} />
            );
          }
          return <Route key={path} path={path} element={element} />;
        })}
        <Route element={<AdminLayout />}>
          {adminRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route element={<UserLayout />}>
          {userRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route path={notFoundRoute.path} element={notFoundRoute.element} />
        <Route path="*" element={<Navigate to={notFoundRoute.path} />} />
      </Routes>
    </div>
  );
}

export default App;
