import { createContext, useContext } from "react";
import type { DialogContextType } from "../context/global-dialog";

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useGlobalDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useGlobalDialog must be used within a DialogProvider");
  }
  return context;
};
