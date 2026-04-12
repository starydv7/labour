"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserMenuDropdown } from "@/components/auth/user-menu";
import { PRIMARY_NAV_LINKS } from "@/config/nav-links";
import { useI18nText } from "@/lib/app-preferences";
import { useAuth } from "@/lib/auth";

function LogoMark() {
  return (
    <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-emerald-600">
      <span className="grid h-3 w-3 grid-cols-3 gap-[2px]">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="h-[3px] w-[3px] rounded-[2px] bg-white" />
        ))}
      </span>
    </span>
  );
}

/** Offset for main content so it clears the fixed header. */
export const LANDING_NAVBAR_OFFSET_PX = 64;

export function LandingNavbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const t = useI18nText();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-50 w-full">
      <header className="border-b border-zinc-200 bg-white shadow-sm">
        <div className="mx-auto flex h-14 min-h-[3.5rem] w-[min(100%,calc(100%-1rem))] max-w-[1600px] items-center justify-between gap-2 px-2 sm:h-16 sm:w-[90%] sm:px-0">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex min-w-0 items-center gap-2 sm:gap-3"
              onClick={() => setMenuOpen(false)}
            >
              <LogoMark />
              <div className="min-w-0 leading-tight">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-sm font-semibold text-zinc-900">Labour</span>
                  <span className="shrink-0 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-medium text-white">
                    BETA
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
            {PRIMARY_NAV_LINKS.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className={`text-sm font-medium ${
                  pathname === item.href ? "text-emerald-700" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {item.label === "Find Work"
                  ? t.findWork
                  : item.label === "Applied Jobs"
                    ? t.appliedJobs
                    : item.label === "How it Works"
                      ? t.howItWorks
                      : item.label === "Pricing"
                        ? t.pricing
                        : item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex lg:gap-3">
            {user ? (
              <UserMenuDropdown />
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
                >
                  {t.signIn}
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex h-9 min-h-[44px] items-center rounded-full bg-emerald-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 sm:px-4"
                >
                  {t.registerFree}
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-zinc-200 text-sm font-medium text-zinc-800 lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen ? (
          <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto border-t border-zinc-200 bg-white lg:hidden">
            <div className="mx-auto flex w-[min(100%,calc(100%-1rem))] max-w-[1600px] flex-col gap-1 px-2 py-3 sm:w-[90%]">
              {PRIMARY_NAV_LINKS.map((item) => (
                <Link
                  key={`m-${item.href}-${item.label}`}
                  href={item.href}
                  className={`rounded-lg px-3 py-3 text-base font-medium ${
                    pathname === item.href ? "bg-emerald-50 text-emerald-800" : "text-zinc-800"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label === "Find Work"
                    ? t.findWork
                    : item.label === "Applied Jobs"
                      ? t.appliedJobs
                      : item.label === "How it Works"
                        ? t.howItWorks
                        : item.label === "Pricing"
                          ? t.pricing
                          : item.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-zinc-100 pt-3">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <p className="truncate px-3 text-xs text-zinc-500">
                      {user.name ?? user.email}
                    </p>
                    <Link
                      href="/profile"
                      className="rounded-lg px-3 py-3 text-base font-medium text-zinc-800"
                      onClick={() => setMenuOpen(false)}
                    >
                      {t.profile}
                    </Link>
                    <button
                      type="button"
                      className="rounded-lg px-3 py-3 text-left text-base font-medium text-red-600"
                      onClick={() => {
                        signOut();
                        setMenuOpen(false);
                      }}
                    >
                      {t.logout}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/auth/login"
                      className="rounded-lg px-3 py-3 text-base font-medium text-zinc-800"
                      onClick={() => setMenuOpen(false)}
                    >
                      {t.signIn}
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-emerald-600 px-3 py-2 text-base font-semibold text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {t.registerFree}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </div>
  );
}

