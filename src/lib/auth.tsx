"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEMO_ACCOUNTS } from "@/config/demo-auth";

export type AuthUser = {
  email: string;
  name?: string;
  role?: "worker";
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (params: { email: string; password: string }) => Promise<void>;
  signUp: (params: { name?: string; email: string; password: string; role?: "worker" }) => Promise<void>;
  signOut: () => void;
  requestPasswordReset: (email: string) => Promise<{ token: string }>;
  resetPassword: (params: { token: string; newPassword: string }) => Promise<void>;
};

const STORAGE_USER_KEY = "labour.auth.user";
const STORAGE_RESET_KEY = "labour.auth.resetTokens"; // token -> email

function readJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function randomToken() {
  // Short token is fine for frontend-only demo flows.
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const existing = readJson<AuthUser>(STORAGE_USER_KEY);
    setUser(existing);
    setIsLoading(false);
  }, []);

  const signIn = useCallback(async ({ email, password }: { email: string; password: string }) => {
    if (!email.trim()) throw new Error("Email is required.");
    if (!password) throw new Error("Password is required.");
    const nextEmail = email.trim().toLowerCase();
    const match = DEMO_ACCOUNTS.find(
      (a) => a.email === nextEmail && a.password === password
    );
    if (!match) {
      throw new Error(
        "Invalid email or password. Demo: worker@labour.demo / Labour123!"
      );
    }
    const nextUser: AuthUser = {
      email: match.email,
      name: match.name,
      role: match.role,
    };
    writeJson(STORAGE_USER_KEY, nextUser);
    setUser(nextUser);
  }, []);

  const signUp = useCallback(
    async ({
      name,
      email,
      password,
      role,
    }: {
      name?: string;
      email: string;
      password: string;
      role?: "worker";
    }) => {
      if (!email.trim()) throw new Error("Email is required.");
      if (!password || password.length < 6) throw new Error("Password must be at least 6 characters.");
      const nextUser: AuthUser = {
        email: email.trim().toLowerCase(),
        name: name?.trim() || undefined,
        role: "worker",
      };
      writeJson(STORAGE_USER_KEY, nextUser);
      setUser(nextUser);
    },
    []
  );

  const signOut = useCallback(() => {
    window.localStorage.removeItem(STORAGE_USER_KEY);
    setUser(null);
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    if (!email.trim()) throw new Error("Email is required.");
    const token = randomToken();
    const map = readJson<Record<string, string>>(STORAGE_RESET_KEY) ?? {};
    map[token] = email.trim().toLowerCase();
    writeJson(STORAGE_RESET_KEY, map);
    return { token };
  }, []);

  const resetPassword = useCallback(async ({ token, newPassword }: { token: string; newPassword: string }) => {
    if (!token) throw new Error("Reset token is required.");
    if (!newPassword || newPassword.length < 6) throw new Error("Password must be at least 6 characters.");
    const map = readJson<Record<string, string>>(STORAGE_RESET_KEY) ?? {};
    const email = map[token];
    if (!email) throw new Error("Invalid or expired reset token.");
    delete map[token];
    writeJson(STORAGE_RESET_KEY, map);
    // Frontend-only: we don't store passwords. We just sign the user in.
    const nextUser: AuthUser = { email };
    writeJson(STORAGE_USER_KEY, nextUser);
    setUser(nextUser);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, signIn, signUp, signOut, requestPasswordReset, resetPassword }),
    [user, isLoading, signIn, signUp, signOut, requestPasswordReset, resetPassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

