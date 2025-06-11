import type { AuthContextType } from "../context/auth";
import { createContext, useContext } from "react";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
