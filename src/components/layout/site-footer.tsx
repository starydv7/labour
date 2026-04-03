import Link from "next/link";
import { PRIMARY_NAV_LINKS } from "@/config/nav-links";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 py-10 sm:w-[90%] sm:px-0 sm:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-600">
                <span className="grid h-3 w-3 grid-cols-3 gap-[2px]">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} className="h-[3px] w-[3px] rounded-[2px] bg-white" />
                  ))}
                </span>
              </span>
              <span className="text-sm font-semibold text-zinc-900">Labour</span>
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-medium leading-none text-white">
                BETA
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600">
              Daily work, fair pay, and trusted employers — built for workers and contractors across
              India.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {PRIMARY_NAV_LINKS.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-700 transition hover:text-emerald-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Account</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/auth/login" className="text-sm text-zinc-700 hover:text-emerald-700">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-sm text-zinc-700 hover:text-emerald-700">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-zinc-700 hover:text-emerald-700">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-sm text-zinc-700 hover:text-emerald-700">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Platform</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/health" className="text-sm text-zinc-700 hover:text-emerald-700">
                  Status
                </Link>
              </li>
              <li>
                <span className="text-sm text-zinc-400">Help centre (soon)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-zinc-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-[11px] text-zinc-500 sm:text-left">
            © {year} Labour Platform Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-[11px] sm:justify-end">
            <span className="text-zinc-400">Privacy (soon)</span>
            <span className="text-zinc-400">Terms (soon)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
