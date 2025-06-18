import { SyncLoader } from "react-spinners";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import Demo from "./pages/user/home";
import AccountPage from "./pages/user/account";
import ProfilePage from "./pages/user/profile";
import SettingsPage from "./pages/user/settings";
import LoginPage from "./pages/user/login";
import RegisterPage from "./pages/user/register";
import AdminLoginPage from "./pages/admin/admin-login";
import AdminDemo from "./pages/admin/admin-home";
import { Navigate, Route, Routes } from "react-router";
import LogoutPage from "./pages/logout";
import { useAdminAuth } from "./hooks/useAdminAuth";
import AdminLayout from "./layouts/admin-layout";
import UserLayout from "./layouts/user-layout";
import AdminCollections from "./pages/admin/admin-collections";

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
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
        <Route
          path="/admin-login"
          element={admin ? <Navigate to="/admin" /> : <AdminLoginPage />}
        />
        <Route path="/logout" element={<LogoutPage />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDemo />} />
          <Route path="/admin/collections" element={<AdminCollections />} />
          <Route path="/admin/settings" element={<AdminDemo />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Demo />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/404" element={<div>404 Not Found</div>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
