import { SyncLoader } from "react-spinners";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import Demo from "./pages/demo";
import AccountPage from "./pages/account";
import ProfilePage from "./pages/profile";
import SettingsPage from "./pages/settings";
import LoginPage from "./pages/login";
import AdminLoginPage from "./pages/admin-login";
import AdminDemo from "./pages/admin-demo";
import { Navigate, Route, Routes } from "react-router";
import LogoutPage from "./pages/logout";
import { useAdminAuth } from "./hooks/useAdminAuth";
import AdminLayout from "./layouts/admin-layout";
import UserLayout from "./layouts/user-layout";

function App() {
  const { user, fetched } = useAuth();
  const { admin, fetched: adminFetched } = useAdminAuth();
  if (!fetched || !adminFetched) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-24 p-4">
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
        <Route
          path="/admin-login"
          element={admin ? <Navigate to="/admin" /> : <AdminLoginPage />}
        />
        <Route path="/logout" element={<LogoutPage />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDemo />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Demo />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
