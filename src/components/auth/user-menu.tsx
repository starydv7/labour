"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth";

type Variant = "light" | "dark";

export function UserMenuDropdown({ variant = "light" }: { variant?: Variant }) {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  if (!user) return null;

  const displayName = user.name?.trim() || user.email.split("@")[0];
  const roleLabel =
    user.role === "worker" ? "Worker" : user.role === "contractor" ? "Employer" : null;

  const btn =
    variant === "dark"
      ? "inline-flex h-9 max-w-[200px] items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100 hover:bg-zinc-800"
      : "inline-flex h-9 max-w-[200px] items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50";

  const panel =
    variant === "dark"
      ? "absolute right-0 z-50 mt-2 w-52 rounded-xl border border-zinc-700 bg-zinc-900 py-1 shadow-lg"
      : "absolute right-0 z-50 mt-2 w-52 rounded-xl border border-zinc-200 bg-white py-1 shadow-lg";

  const item =
    variant === "dark"
      ? "block w-full px-4 py-2.5 text-left text-sm text-zinc-200 hover:bg-zinc-800"
      : "block w-full px-4 py-2.5 text-left text-sm text-zinc-700 hover:bg-zinc-50";

  const danger =
    variant === "dark"
      ? "w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-zinc-800"
      : "w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50";

  return (
    <div className="relative" ref={ref}>
      <button type="button" className={btn} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="truncate">{displayName}</span>
        <span className="text-[10px] opacity-70" aria-hidden>
          ▾
        </span>
      </button>
      {open ? (
        <div className={panel} role="menu">
          <div
            className={
              variant === "dark"
                ? "border-b border-zinc-700 px-4 py-2"
                : "border-b border-zinc-100 px-4 py-2"
            }
          >
            <div
              className={
                variant === "dark"
                  ? "truncate text-sm font-medium text-white"
                  : "truncate text-sm font-medium text-zinc-900"
              }
            >
              {displayName}
            </div>
            <div
              className={
                variant === "dark" ? "truncate text-xs text-zinc-400" : "truncate text-xs text-zinc-500"
              }
            >
              {user.email}
            </div>
            {roleLabel ? (
              <div
                className={
                  variant === "dark"
                    ? "mt-1 text-[11px] font-medium text-emerald-400"
                    : "mt-1 text-[11px] font-medium text-emerald-700"
                }
              >
                {roleLabel}
              </div>
            ) : null}
          </div>
          <Link href="/profile" className={item} role="menuitem" onClick={() => setOpen(false)}>
            Profile
          </Link>
          <button
            type="button"
            className={danger}
            role="menuitem"
            onClick={() => {
              signOut();
              setOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
