import PBURL from "../lib/pburl";
import type { TypedPocketBase } from "../lib/pocketbase-types";
import { useState } from "react";
import PocketBase from "pocketbase";
import { ClientContext } from "../hooks/useClient";

export interface ClientContextType {
  pb: TypedPocketBase;
}

interface ClientProviderProps {
  children: React.ReactNode;
}

export function ClientContextProvider({ children }: ClientProviderProps) {
  const [pb] = useState<TypedPocketBase>(new PocketBase(PBURL));

  return <ClientContext.Provider value={{ pb }}>{children}</ClientContext.Provider>;
}
