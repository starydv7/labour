"use client";

import Link from "next/link";
import { useState } from "react";
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

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V7l8-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClockPayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4l2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="11" r="2" fill="currentColor" />
    </svg>
  );
}

function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v18M5 8l3 6h8l3-6M8 14h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
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

      <section
        className="border-t border-zinc-200 bg-white"
        aria-labelledby="trust-credibility-heading"
      >
        <div className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 py-12 sm:w-[90%] sm:px-0 sm:py-16">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
              Trust &amp; credibility
            </p>
            <h2
              id="trust-credibility-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
            >
              Why workers and contractors choose Labour
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-600">
              Clear pay, verified sites, and support when you need it — so you can focus on the work,
              not the worry.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Verified employers",
                body: "Contractors and sites are reviewed before listings go live.",
                icon: ShieldIcon,
              },
              {
                title: "On-time pay",
                body: "Agreed wages and pay cycles shown upfront on every job.",
                icon: ClockPayIcon,
              },
              {
                title: "Jobs near you",
                body: "Openings across Delhi NCR — filter by trade and location.",
                icon: MapPinIcon,
              },
              {
                title: "Fair & transparent",
                body: "No hidden fees for workers to register or browse openings.",
                icon: ScaleIcon,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-100 bg-zinc-50/80 p-5 text-left shadow-sm"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-zinc-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.body}</p>
              </div>
            );
            })}
          </div>

          <div className="mt-16 border-t border-zinc-100 pt-16">
            <h3 className="text-center text-lg font-semibold text-zinc-900 sm:text-xl">
              How it works
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm text-zinc-600">
              Three simple steps from signup to your next shift.
            </p>
            <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {[
                {
                  step: "1",
                  title: "Register free",
                  body: "Create your profile in minutes with your trade, skills, and preferred areas.",
                },
                {
                  step: "2",
                  title: "Browse & apply",
                  body: "See verified openings, pay, and location — apply to roles that fit you.",
                },
                {
                  step: "3",
                  title: "Work & get paid",
                  body: "Start on site with clear terms and track your applications in one place.",
                },
              ].map((s) => (
                <li key={s.step} className="flex flex-col items-center text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-lg font-bold text-white shadow-sm">
                    {s.step}
                  </span>
                  <h4 className="mt-4 text-sm font-semibold text-zinc-900">{s.title}</h4>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-600">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 border-t border-zinc-100 pt-16">
            <h3 className="text-center text-lg font-semibold text-zinc-900 sm:text-xl">
              What people say
            </h3>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  quote:
                    "I found steady mason work within a week. Pay and site details were clear before I went.",
                  name: "Rajesh K.",
                  role: "Mason · Gurugram",
                },
                {
                  quote:
                    "Posting helpers for our site is faster than phone calls. Workers show up knowing the rate.",
                  name: "Priya S.",
                  role: "Site supervisor · Noida",
                },
                {
                  quote:
                    "As a driver, I like seeing monthly pay and location upfront. Less back-and-forth.",
                  name: "Amit D.",
                  role: "Driver · Delhi",
                },
              ].map((t) => (
                <blockquote
                  key={t.name}
                  className="flex flex-col rounded-2xl border border-zinc-200 bg-[#f7fafc] p-6 shadow-sm"
                >
                  <p className="text-sm leading-relaxed text-zinc-700">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 border-t border-zinc-200/80 pt-4">
                    <cite className="not-italic">
                      <span className="text-sm font-semibold text-zinc-900">{t.name}</span>
                      <span className="mt-0.5 block text-xs text-zinc-500">{t.role}</span>
                    </cite>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t border-zinc-200 bg-[#f0f4f8]"
        aria-labelledby="audiences-heading"
      >
        <div className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 py-12 sm:w-[90%] sm:px-0 sm:py-16">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
              Built for both sides
            </p>
            <h2
              id="audiences-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
            >
              For workers and for employers
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-600">
              Whether you&apos;re looking for your next site or your next hire, Labour keeps pay and
              expectations clear.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                Workers
              </div>
              <h3 className="mt-4 text-xl font-semibold text-zinc-900">Find work that fits you</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Skilled and general labour — masons, electricians, drivers, helpers, and more across
                Delhi NCR.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-700">
                <li className="flex gap-2">
                  <span className="mt-0.5 shrink-0">
                    <GreenCheck />
                  </span>
                  <span>Browse verified openings with pay and location upfront</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 shrink-0">
                    <GreenCheck />
                  </span>
                  <span>Apply from one profile — track where you&apos;ve applied</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 shrink-0">
                    <GreenCheck />
                  </span>
                  <span>No fee to register or browse jobs</span>
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/auth/signup?role=worker"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
                >
                  Register as a worker
                </Link>
                <Link
                  href="/jobs"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
                >
                  Browse jobs
                </Link>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="inline-flex w-fit rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-800">
                Employers &amp; contractors
              </div>
              <h3 className="mt-4 text-xl font-semibold text-zinc-900">Hire labour faster</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Post requirements by trade, set wages, and reach workers who are ready to work.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-700">
                <li className="flex gap-2">
                  <span className="mt-0.5 shrink-0">
                    <GreenCheck />
                  </span>
                  <span>List sites and shifts with clear pay — daily or monthly</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 shrink-0">
                    <GreenCheck />
                  </span>
                  <span>Workers see your posting in the same place they search for jobs</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 shrink-0">
                    <GreenCheck />
                  </span>
                  <span>Manage listings from your account when you&apos;re signed in</span>
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/auth/signup?role=employer"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800"
                >
                  Register to hire
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
                >
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingFaq />

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

const FAQ_ITEMS = [
  {
    id: "cost",
    q: "Does it cost anything to register as a worker?",
    a: "No. Creating a worker profile and browsing open jobs on Labour is free. You only invest your time when you choose to apply.",
  },
  {
    id: "pay",
    q: "How do I know what I will be paid?",
    a: "Each listing shows pay type (per day, per month, or contract) and the amount before you apply. Always confirm final terms on site with the contractor.",
  },
  {
    id: "cities",
    q: "Which cities do you cover?",
    a: "We focus on Delhi NCR and surrounding areas today, with more cities rolling out over time. Use location filters when you browse jobs.",
  },
  {
    id: "employer-post",
    q: "How do employers post a job?",
    a: "Sign up as an employer or contractor, then use Post a job to describe the trade, location, number of workers, and wages. Listings appear where workers search.",
  },
  {
    id: "verified",
    q: "What does “verified employer” mean?",
    a: "We review contractor and site information to reduce fake listings. It is not a legal guarantee — always use good judgment and agreed written terms where possible.",
  },
  {
    id: "account",
    q: "I forgot my password. What should I do?",
    a: "Use Forgot password on the sign-in page to start a reset. This demo app stores auth in your browser only; in production you would receive a secure link by email.",
  },
] as const;

function LandingFaq() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section className="border-t border-zinc-200 bg-white" aria-labelledby="faq-heading">
      <div className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 py-12 sm:w-[90%] sm:px-0 sm:py-16">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
          >
            Common questions
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-600">
            Quick answers about signing up, pay, and how Labour works.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-[#f7fafc] px-1 sm:px-2">
          {FAQ_ITEMS.map((item) => {
            const open = openId === item.id;
            return (
              <div key={item.id} className="border-b border-zinc-200 last:border-b-0">
                <h3 className="m-0">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 py-4 pl-3 pr-3 text-left text-sm font-semibold text-zinc-900 sm:pl-4 sm:pr-4"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span className="min-w-0">{item.q}</span>
                    <span
                      className={`shrink-0 text-zinc-400 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      ▾
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  className={open ? "block" : "hidden"}
                >
                  <p className="border-t border-zinc-100 px-3 pb-4 pt-3 text-sm leading-relaxed text-zinc-600 sm:px-4">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-zinc-600">
          Still stuck?{" "}
          <Link href="/auth/login" className="font-semibold text-emerald-700 hover:underline">
            Sign in
          </Link>{" "}
          or{" "}
          <Link href="/auth/signup" className="font-semibold text-emerald-700 hover:underline">
            create an account
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

