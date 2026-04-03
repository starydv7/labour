"use client";

import { LandingNavbar, LANDING_NAVBAR_OFFSET_PX } from "@/components/landing/landing-navbar";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
      <LandingNavbar />

      <div style={{ paddingTop: LANDING_NAVBAR_OFFSET_PX }}>
        <div className="mx-auto flex min-h-full w-[min(100%,calc(100%-1rem))] max-w-[1600px] flex-col px-2 sm:w-[90%] sm:px-0">
          <main className="mt-8 flex flex-1 flex-col sm:mt-10">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
            {subtitle ? (
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {subtitle}
              </p>
            ) : null}

            <div className="mt-6 w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-7">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

