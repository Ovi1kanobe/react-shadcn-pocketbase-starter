import type { ClientContextType } from "../context/client";
import { createContext, useContext } from "react";

export const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const useClient = (): ClientContextType => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientContextProvider.");
  }
  return context;
};
