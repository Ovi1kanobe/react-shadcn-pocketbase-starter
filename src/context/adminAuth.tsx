import PocketBase, { type CollectionModel } from "pocketbase";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminAuthContext } from "../hooks/useAdminAuth";
import PBURL from "../lib/pburl";
import type { SuperusersResponse, TypedPocketBase } from "../lib/pocketbase-types";
import PocketBaseError from "../lib/pberror";

export interface AdminAuthContextType {
  admin: SuperusersResponse | null;
  fetched: boolean;
  loginWithPassword: (
    email: string,
    password: string,
    onError: (error: PocketBaseError) => void,
    onSuccess: () => void
  ) => void;
  logout: () => void;
  fetchCollections: (
    onError: (error: PocketBaseError) => void,
    onSuccess: (res: CollectionModel[]) => void,
    filter?: string
  ) => void;
}

interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export function AdminAuthContextProvider({ children }: AdminAuthProviderProps) {
  const [pb] = useState<TypedPocketBase>(new PocketBase(PBURL) as TypedPocketBase);
  const [admin, setAdmin] = useState<SuperusersResponse | null>(null);
  const [fetched, setFetched] = useState(false);

  const loginWithPassword = useCallback(
    async (
      email: string,
      password: string,
      onError: (error: PocketBaseError) => void,
      onSuccess: () => void
    ) => {
      try {
        const res = await pb.collection("_superusers").authWithPassword(email, password);
        setAdmin(res.record);
        onSuccess();
      } catch (error) {
        onError(error as PocketBaseError);
      }
    },
    [pb]
  );

  const fetchCurrentAdmin = useCallback(
    async (
      onError?: (error: PocketBaseError) => void,
      onSuccess?: (admin: SuperusersResponse) => void
    ) => {
      try {
        if (!pb.authStore.isValid || !pb.authStore.model) {
          throw new PocketBaseError(
            "",
            401,
            { code: 1001, message: "Auth failed", data: {} },
            false,
            null
          );
        }
        const id = pb.authStore.model.id;
        const adminRes = await pb.collection("_superusers").getOne(id);
        if (onSuccess) onSuccess(adminRes);
      } catch (e) {
        const err = e as PocketBaseError;
        if (err.isAbort) return;
        if (onError) onError(err);
      }
    },
    [pb]
  );

  const fetchCollections = useCallback(
    async (
      onError: (error: PocketBaseError) => void,
      onSuccess: (res: CollectionModel[]) => void,
      filter?: string
    ) => {
      try {
        const res = await pb.collections.getFullList({
          filter: filter,
        });
        onSuccess(res);
      } catch (error) {
        const err = error as PocketBaseError;
        if (err.isAbort) return;
        onError(error as PocketBaseError);
      }
    },
    [pb]
  );

  const logout = useCallback(() => {
    pb.authStore.clear();
    setAdmin(null);
    setFetched(true);
  }, [pb]);

  useEffect(() => {
    fetchCurrentAdmin(
      () => {
        setFetched(true);
      },
      (adminRes) => {
        setAdmin(adminRes);
        setFetched(true);
      }
    );
    const removeListener = pb.authStore.onChange(() => {
      fetchCurrentAdmin(
        () => {
          setAdmin(null);
          setFetched(true);
        },
        (adminRes) => {
          setAdmin(adminRes);
          setFetched(true);
        }
      );
    });
    return () => {
      removeListener();
    };
  }, [fetchCurrentAdmin, pb.authStore]);

  const ctxValue: AdminAuthContextType = useMemo(
    () => ({ admin, fetched, loginWithPassword, logout, fetchCollections }),
    [admin, fetched, loginWithPassword, logout, fetchCollections]
  );

  return <AdminAuthContext.Provider value={ctxValue}>{children}</AdminAuthContext.Provider>;
}
