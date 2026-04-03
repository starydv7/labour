"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Protected } from "@/components/auth/protected";
import { LandingNavbar, LANDING_NAVBAR_OFFSET_PX } from "@/components/landing/landing-navbar";
import { useAuth } from "@/lib/auth";
import { savePostedJob } from "@/lib/posted-jobs";

const TRADES = [
  "Mason / Raj Mistri",
  "Electrician",
  "Plumber",
  "Carpenter",
  "Welder",
  "Helper / Beldar",
  "Driver",
  "Painter",
  "Other",
] as const;

export default function PostJobPage() {
  return (
    <Protected>
      <PostJobInner />
    </Protected>
  );
}

function PostJobInner() {
  const router = useRouter();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [trade, setTrade] = useState<string>(TRADES[0]);
  const [location, setLocation] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [workersNeeded, setWorkersNeeded] = useState(1);
  const [wageType, setWageType] = useState<"per_day" | "per_month" | "contract">("per_day");
  const [wageAmount, setWageAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");

  if (user?.role !== "contractor") {
    return (
      <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <LandingNavbar />
        <div
          className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 pb-12 sm:w-[90%] sm:px-0"
          style={{ paddingTop: LANDING_NAVBAR_OFFSET_PX }}
        >
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-lg font-semibold text-zinc-900">Posting is for employers</h1>
            <p className="mt-2 text-sm text-zinc-600">
              Only employer / contractor accounts can post labour requirements. Browse open roles or
              use an employer account to post.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                Browse jobs
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
      <LandingNavbar />
      <div
        className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 pb-12 sm:w-[90%] sm:px-0"
        style={{ paddingTop: LANDING_NAVBAR_OFFSET_PX }}
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link
              href="/jobs"
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              ← Back to jobs
            </Link>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
              Post labour requirement
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Describe the work, location, and pay. Workers will see this on the jobs list (demo:
              saved in your browser only).
            </p>
          </div>
        </div>

        {saved ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950">
            <div className="font-semibold">Requirement posted</div>
            <p className="mt-2 text-sm text-emerald-900/90">
              Your listing was saved locally. Open{" "}
              <Link href="/jobs" className="font-medium underline">
                Jobs
              </Link>{" "}
              to see it in the list.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setTrade(TRADES[0]);
                  setLocation("");
                  setSiteAddress("");
                  setWorkersNeeded(1);
                  setWageType("per_day");
                  setWageAmount("");
                  setStartDate("");
                  setDuration("");
                  setDescription("");
                  setRequirements("");
                  setSaved(false);
                  router.refresh();
                }}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
              >
                Post another
              </button>
              <Link
                href="/jobs"
                className="rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-100/50"
              >
                View jobs
              </Link>
            </div>
          </div>
        ) : (
          <form
            className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (!user?.email) return;
              if (!title.trim() || !location.trim() || !wageAmount.trim()) return;
              setSubmitting(true);
              try {
                savePostedJob({
                  title: title.trim(),
                  trade,
                  location: location.trim(),
                  siteAddress: siteAddress.trim(),
                  workersNeeded: Math.max(1, workersNeeded),
                  wageType,
                  wageAmount: wageAmount.trim(),
                  startDate: startDate.trim(),
                  duration: duration.trim(),
                  description: description.trim(),
                  requirements: requirements.trim(),
                  postedByEmail: user.email,
                });
                setSaved(true);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-zinc-900" htmlFor="title">
                  Job title / role needed
                </label>
                <input
                  id="title"
                  className="mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
                  placeholder="e.g. Masons for residential project"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-900" htmlFor="trade">
                  Trade / category
                </label>
                <select
                  id="trade"
                  className="mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                >
                  {TRADES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-900" htmlFor="workers">
                  Workers needed
                </label>
                <input
                  id="workers"
                  type="number"
                  min={1}
                  className="mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
                  value={workersNeeded}
                  onChange={(e) => setWorkersNeeded(Number(e.target.value) || 1)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-zinc-900" htmlFor="location">
                  City / area
                </label>
                <input
                  id="location"
                  className="mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
                  placeholder="e.g. Gurugram, Haryana"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-zinc-900" htmlFor="site">
                  Site address (optional)
                </label>
                <input
                  id="site"
                  className="mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
                  placeholder="Full site location for workers"
                  value={siteAddress}
                  onChange={(e) => setSiteAddress(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-900" htmlFor="wageType">
                  Pay type
                </label>
                <select
                  id="wageType"
                  className="mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
                  value={wageType}
                  onChange={(e) =>
                    setWageType(e.target.value as "per_day" | "per_month" | "contract")
                  }
                >
                  <option value="per_day">Per day</option>
                  <option value="per_month">Per month</option>
                  <option value="contract">Contract / lump sum</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-900" htmlFor="wageAmount">
                  Amount (₹)
                </label>
                <input
                  id="wageAmount"
                  className="mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
                  placeholder="e.g. 650 or 18000"
                  value={wageAmount}
                  onChange={(e) => setWageAmount(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-900" htmlFor="start">
                  Start date
                </label>
                <input
                  id="start"
                  type="date"
                  className="mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-900" htmlFor="duration">
                  Duration
                </label>
                <input
                  id="duration"
                  className="mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
                  placeholder="e.g. 2 months, 30 days"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-zinc-900" htmlFor="description">
                  Work description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
                  placeholder="What work is required, shift timings, safety notes…"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-zinc-900" htmlFor="requirements">
                  Skills & requirements
                </label>
                <textarea
                  id="requirements"
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
                  placeholder="e.g. ITI electrician, 2+ years experience, own tools…"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-6">
              <p className="text-xs text-zinc-500">
                Posting as <span className="font-medium text-zinc-700">{user?.email}</span>
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:opacity-60"
              >
                {submitting ? "Saving…" : "Post requirement"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
