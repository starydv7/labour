"use client";

import { AuthProvider } from "@/lib/auth";
import { AppPreferencesProvider } from "@/lib/app-preferences";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppPreferencesProvider>{children}</AppPreferencesProvider>
    </AuthProvider>
  );
}

