import { createContext, useContext } from "react";
import type { AdminAuthContextType } from "../context/adminAuth";

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthContextProvider");
  }
  return context;
};
