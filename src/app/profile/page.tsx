"use client";

import Link from "next/link";
import { Protected } from "@/components/auth/protected";
import { LandingNavbar, LANDING_NAVBAR_OFFSET_PX } from "@/components/landing/landing-navbar";
import { useAuth } from "@/lib/auth";

export default function ProfilePage() {
  return (
    <Protected>
      <ProfileInner />
    </Protected>
  );
}

function ProfileInner() {
  const { user } = useAuth();

  return (
    <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
      <LandingNavbar />
      <div
        className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 pb-10 sm:w-[90%] sm:px-0"
        style={{ paddingTop: LANDING_NAVBAR_OFFSET_PX }}
      >
        <main className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-lg font-semibold text-zinc-900">Profile</h1>
          <p className="mt-1 text-sm text-zinc-600">
            This is a frontend-only profile placeholder. Connect a real API later.
          </p>
          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="text-zinc-500">Name</dt>
              <dd className="font-medium text-zinc-900">{user?.name ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Email</dt>
              <dd className="font-medium text-zinc-900">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Role</dt>
              <dd className="font-medium text-zinc-900">
                {user?.role === "worker"
                  ? "Worker"
                  : user?.role === "contractor"
                    ? "Employer / Contractor"
                    : "—"}
              </dd>
            </div>
          </dl>
          <div className="mt-8">
            <Link href="/dashboard" className="text-sm font-medium text-emerald-700 hover:underline">
              Back to dashboard
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
