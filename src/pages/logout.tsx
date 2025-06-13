import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const LogoutPage = () => {
  const { logout } = useAuth();
  const { logout: adminLogout } = useAdminAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    adminLogout();
    navigate("/login", { replace: true });
  }, [logout, adminLogout, navigate]);
  return null;
};

export default LogoutPage;
