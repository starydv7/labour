"use client";

import Link from "next/link";
import { LANDING_NAVBAR_OFFSET_PX } from "@/components/landing/landing-navbar";

function GreenCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M7.8 14.2L3.7 10.1L5.1 8.7L7.8 11.4L14.9 4.3L16.3 5.7L7.8 14.2Z"
        fill="#16a34a"
      />
    </svg>
  );
}

export function LandingHero() {
  return (
    <div
      className="min-h-full bg-[#f7fafc]"
      style={{ paddingTop: LANDING_NAVBAR_OFFSET_PX }}
    >
      <div className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 pb-10 pt-6 sm:w-[90%] sm:px-0 sm:pt-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-10">
          <section>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/auth/signup?role=worker"
                className="inline-flex h-9 items-center rounded-full bg-emerald-600 px-4 text-sm font-medium text-white shadow-sm"
              >
                I&apos;m a Worker
              </Link>
              <Link
                href="/auth/signup?role=employer"
                className="inline-flex h-9 items-center rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 shadow-sm"
              >
                I&apos;m an Employer / Contractor
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-600 sm:mt-10 sm:gap-3 sm:text-xs">
              <span className="h-px w-8 shrink-0 bg-emerald-500 sm:w-12" />
              <span className="min-w-0 leading-snug">
                TRUSTED BY 50,000+ WORKERS ACROSS INDIA
              </span>
            </div>

            <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.08] text-zinc-900 sm:text-4xl md:text-5xl">
              Find <span className="text-emerald-600">daily work</span>,<br />
              get paid on time,
              <br />
              grow your career.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
              Labour connects skilled workers - masons, electricians, drivers, helpers and more - with
              trusted contractors and employers.
              <br />
              Register free in 2 minutes, no experience needed.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/auth/signup?role=worker"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
              >
                Register as a Worker - It&apos;s Free
              </Link>
              <Link
                href="/jobs"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50"
              >
                Browse Jobs
              </Link>
            </div>

            <div className="mt-6 grid gap-2 text-xs text-zinc-500 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <GreenCheck /> Free registration
              </div>
              <div className="flex items-center gap-2">
                <GreenCheck /> Daily &amp; weekly pay
              </div>
              <div className="flex items-center gap-2">
                <GreenCheck /> Verified employers only
              </div>
              <div className="flex items-center gap-2">
                <GreenCheck /> Work near you
              </div>
            </div>
          </section>

          <aside className="mt-10">
            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-lg">
              <div className="rounded-2xl bg-emerald-600 p-4">
                <div className="text-[11px] font-semibold text-white/90">LIVE JOB OPENINGS</div>
                <div className="mt-1 text-lg font-semibold text-white">Jobs near Delhi NCR</div>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  { letter: "M", color: "bg-amber-500", title: "Mason / Raj Mistri", place: "Gurugram, HR", wage: "₹650", meta: "per day" },
                  { letter: "E", color: "bg-blue-600", title: "Electrician (ITI)", place: "Noida, UP", wage: "₹18K", meta: "per month" },
                  { letter: "D", color: "bg-emerald-600", title: "Driver (LMV / HMV)", place: "Delhi", wage: "₹22K", meta: "per month" },
                ].map((job) => (
                  <div
                    key={job.title}
                    className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${job.color}`}>
                        <div className="text-sm font-bold text-white">{job.letter}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-zinc-900">{job.title}</div>
                        <div className="text-xs text-zinc-500">{job.place}</div>
                      </div>
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <div className="text-sm font-semibold text-zinc-900">{job.wage}</div>
                      <div className="text-[11px] text-zinc-500">{job.meta}</div>
                    </div>
                  </div>
                ))}

                <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-900 text-white">
                        <span className="text-sm font-bold">₹</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-900">2.4 Cr+</div>
                        <div className="text-xs text-zinc-500">Wages paid this month</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-emerald-700 font-semibold">Qualified</div>
                      <div className="text-[11px] text-zinc-500">View details</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">1,240 jobs available near you</div>
                <Link
                  href="/jobs"
                  className="inline-flex shrink-0 items-center gap-1 font-semibold text-zinc-900"
                >
                  View all jobs <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section
        className="border-t border-zinc-200/80 bg-[#f0f4f8]"
        aria-labelledby="available-work-heading"
      >
        <div className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 py-10 sm:w-[90%] sm:px-0 sm:py-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                Open roles
              </p>
              <h2
                id="available-work-heading"
                className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
              >
                Available work
              </h2>
              <p className="mt-2 max-w-xl text-sm text-zinc-600">
                Real openings from contractors near Delhi NCR — updated daily. Sign in to apply.
              </p>
            </div>
            <Link
              href="/jobs"
              className="mt-2 inline-flex shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50 sm:mt-0"
            >
              See all openings
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                letter: "P",
                color: "bg-violet-600",
                title: "Plumber",
                place: "Noida · 2 sites",
                wage: "₹800",
                meta: "per day",
              },
              {
                letter: "W",
                color: "bg-orange-500",
                title: "Welder",
                place: "Faridabad",
                wage: "₹22K",
                meta: "per month",
              },
              {
                letter: "C",
                color: "bg-sky-600",
                title: "Carpenter",
                place: "Gurugram",
                wage: "₹750",
                meta: "per day",
              },
              {
                letter: "H",
                color: "bg-zinc-700",
                title: "Helper / Beldar",
                place: "Delhi NCR",
                wage: "₹550",
                meta: "per day",
              },
            ].map((job) => (
              <article
                key={job.title}
                className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${job.color}`}
                  >
                    {job.letter}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-zinc-900">{job.title}</h3>
                    <p className="text-xs text-zinc-500">{job.place}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between border-t border-zinc-100 pt-3">
                  <div>
                    <span className="text-lg font-bold tabular-nums text-zinc-900">{job.wage}</span>
                    <span className="ml-1 text-xs text-zinc-500">{job.meta}</span>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                    Open
                  </span>
                </div>
                <Link
                  href="/auth/login"
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-500"
                >
                  View &amp; apply
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full bg-[#0b1f3d]">
        <div className="mx-auto grid w-[min(100%,calc(100%-1rem))] max-w-[1600px] grid-cols-2 gap-6 px-2 py-8 sm:w-[90%] sm:grid-cols-3 sm:px-0 md:grid-cols-5">
          {[
            { v: "50K+", l: "Registered workers" },
            { v: "2,400+", l: "Verified employers & contractors" },
            { v: "18+", l: "Trade categories" },
            { v: "40+", l: "Cities across India" },
            { v: "₹2.4Cr+", l: "Wages paid this month" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="text-2xl font-semibold text-white">{s.v}</div>
              <div className="mt-1 text-xs font-medium text-white/70">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

