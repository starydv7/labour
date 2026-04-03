"use client";

import { Protected } from "@/components/auth/protected";
import { LandingNavbar, LANDING_NAVBAR_OFFSET_PX } from "@/components/landing/landing-navbar";
import { useAuth } from "@/lib/auth";

export default function DashboardPage() {
  return (
    <Protected>
      <DashboardInner />
    </Protected>
  );
}

function DashboardInner() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
      <LandingNavbar />
      <div
        className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 pb-10 sm:w-[90%] sm:px-0"
        style={{ paddingTop: LANDING_NAVBAR_OFFSET_PX }}
      >
        <main className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold">Dashboard</div>
          <p className="mt-2 text-sm text-zinc-600">
            Signed in as {user?.email}
          </p>
          <button
            type="button"
            onClick={signOut}
            className="mt-4 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            Sign out
          </button>
        </main>
      </div>
    </div>
  );
}

