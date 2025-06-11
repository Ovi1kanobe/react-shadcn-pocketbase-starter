import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);
  return null;
};

export default LogoutPage;
