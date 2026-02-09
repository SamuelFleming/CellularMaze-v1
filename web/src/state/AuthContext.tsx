"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { ApiUser } from "@/lib/apiClient";

type AuthStatus = "none" | "guest" | "user";

type AuthState = {
  status: AuthStatus;
  token?: string;
  user?: ApiUser;
};

type AuthContextValue = AuthState & {
  setSession: (token: string, user: ApiUser) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "none" });

  const value = useMemo<AuthContextValue>(() => {
    return {
      ...state,
      setSession: (token, user) => {
        setState({
          status: user.role === "guest" ? "guest" : "user",
          token,
          user
        });
      },
      signOut: () => setState({ status: "none" })
    };
  }, [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
