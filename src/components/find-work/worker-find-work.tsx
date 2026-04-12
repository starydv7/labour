"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DEMO_OPENINGS } from "@/components/find-work/demo-openings";
import { useI18nText } from "@/lib/app-preferences";
import type { PostedJob } from "@/lib/posted-jobs";
import {
  addAppliedJobId,
  hasApplied,
  loadAppliedJobIds,
} from "@/lib/worker-applications";

const TRADE_CHIPS = [
  { id: "all", key: "allJobs", trade: null as string | null },
  { id: "mason", key: "mason", trade: "Mason" },
  { id: "electrician", key: "electrician", trade: "Electrician" },
  { id: "driver", key: "driver", trade: "Driver" },
  { id: "plumber", key: "plumber", trade: "Plumber" },
  { id: "helper", key: "helper", trade: "Helper" },
  { id: "carpenter", key: "carpenter", trade: "Carpenter" },
  { id: "painter", key: "painter", trade: "Painter" },
] as const;

const BADGE_COLORS = [
  "bg-amber-500",
  "bg-blue-600",
  "bg-emerald-600",
  "bg-violet-600",
  "bg-rose-500",
  "bg-cyan-600",
] as const;

function matchesLocation(job: PostedJob, loc: string): boolean {
  if (loc === "Delhi NCR") return true;
  const L = job.location.toLowerCase();
  if (loc === "Delhi") {
    if (/(noida|gurugram|gurgaon)/i.test(L) && !/delhi/i.test(L)) return false;
    return /delhi|new delhi|ncr/i.test(L);
  }
  if (loc === "Noida") return /noida/i.test(L);
  if (loc === "Gurugram") return /gurugram|gurgaon/i.test(L);
  return true;
}

function hashPick(s: string, mod: number) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h) % mod;
}

function companyLabel(email: string): string {
  const local = email.split("@")[0] ?? "Company";
  const domain = email.split("@")[1]?.split(".")[0] ?? "Partner";
  if (email.includes("swiftmove")) return "SwiftMove Logistics";
  if (email.includes("buildwell")) return "BuildWell Infra";
  if (email.includes("spark")) return "Spark Electricals";
  return `${domain.charAt(0).toUpperCase()}${domain.slice(1)} Services`;
}

function letterFor(job: PostedJob): string {
  const t = job.trade || job.title;
  return (t.trim().charAt(0) || "J").toUpperCase();
}

function badgeColor(job: PostedJob): string {
  return BADGE_COLORS[hashPick(job.id, BADGE_COLORS.length)] ?? "bg-emerald-600";
}

function formatPay(job: PostedJob, t: Record<string, string>): string {
  const n = Number(String(job.wageAmount).replace(/,/g, "").replace(/[^\d.]/g, ""));
  const amt = Number.isFinite(n)
    ? `₹${n.toLocaleString("en-IN")}`
    : `₹${job.wageAmount}`;
  if (job.wageType === "per_day") return `${amt} ${t.perDay}`;
  if (job.wageType === "per_month") return `${amt} ${t.perMonth}`;
  return `${amt} (${t.contractLabel})`;
}

function formatPayShort(job: PostedJob, t: Record<string, string>): string {
  const raw = job.wageAmount.replace(/,/g, "");
  const n = Number(raw);
  const amt = Number.isFinite(n) ? `₹${n.toLocaleString("en-IN")}` : `₹${job.wageAmount}`;
  if (job.wageType === "per_day") return `${amt}/${t.perDay}`;
  if (job.wageType === "per_month") return `${amt}/${t.perMonth}`;
  return amt;
}

function timeAgo(iso: string, t: Record<string, string>): string {
  const d = new Date(iso).getTime();
  const diff = Date.now() - d;
  const days = Math.floor(diff / 86400000);
  if (days < 1) return t.today;
  if (days === 1) return `1 ${t.daysAgoSuffix}`;
  return `${days} ${t.daysAgoSuffix}`;
}

type ActivityTab = "applied" | "confirmed" | "completed";

type ActivityRow = {
  id: string;
  jobId: string;
  title: string;
  company: string;
  location: string;
  payShort: string;
  letter: string;
  color: string;
  status: "Applied" | "Shortlisted" | "Confirmed" | "Completed";
  statusNote: string;
};

const MOCK_ACTIVITY_SEED: ActivityRow[] = [
  {
    id: "seed-1",
    jobId: "seed-1",
    title: "Electrician (ITI)",
    company: "MetroBuild Pvt Ltd",
    location: "Noida",
    payShort: "₹18,000/mo",
    letter: "E",
    color: "bg-blue-600",
    status: "Applied",
    statusNote: "Applied 2 days ago",
  },
  {
    id: "seed-2",
    jobId: "seed-2",
    title: "Mason / Tile work",
    company: "Urban Sites Co.",
    location: "Gurugram",
    payShort: "₹720/day",
    letter: "M",
    color: "bg-amber-500",
    status: "Shortlisted",
    statusNote: "Shortlisted today",
  },
];

export function WorkerFindWork({ jobs }: { jobs: PostedJob[] }) {
  const t = useI18nText();
  const LOCATION_OPTIONS = ["Delhi", "Noida", "Gurugram", "Delhi NCR"] as const;
  const JOB_TYPE_OPTIONS = [
    { id: "all", label: t.allTypes },
    { id: "full", label: t.fullTime },
    { id: "daily", label: t.dailyWage },
    { id: "contract", label: t.contract },
  ] as const;
  const [location, setLocation] = useState<string>("Delhi");
  const [jobType, setJobType] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [chip, setChip] = useState<string>("all");
  const [activityTab, setActivityTab] = useState<ActivityTab>("applied");
  const [appliedTick, setAppliedTick] = useState(0);

  const source = useMemo(
    () => (jobs.length > 0 ? jobs : DEMO_OPENINGS),
    [jobs],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const tradeFilter = TRADE_CHIPS.find((c) => c.id === chip)?.trade;
    return source.filter((j) => {
      if (tradeFilter && !j.trade.toLowerCase().includes(tradeFilter.toLowerCase())) {
        return false;
      }
      if (!matchesLocation(j, location)) return false;
      if (q) {
        const blob = `${j.title} ${j.trade} ${j.description} ${j.location}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [source, chip, location, query]);

  const liveCount = source.length;

  const activityRows = useMemo((): Record<ActivityTab, ActivityRow[]> => {
    const ids = loadAppliedJobIds();
    const appliedFromStorage: ActivityRow[] = ids
      .map((id) => source.find((j) => j.id === id))
      .filter(Boolean)
      .map((j) => {
        const job = j as PostedJob;
        return {
          id: `app-${job.id}`,
          jobId: job.id,
          title: job.title,
          company: companyLabel(job.postedByEmail),
          location: job.location,
          payShort: formatPayShort(job, t),
          letter: letterFor(job),
          color: badgeColor(job),
          status: "Applied" as const,
          statusNote: t.appliedDaysAgo.replace("{{days}}", String(Math.max(1, Math.floor((Date.now() - new Date(job.createdAt).getTime()) / 86400000)))),
        };
      });

    const localizedSeed = MOCK_ACTIVITY_SEED.map((row) => ({
      ...row,
      payShort: row.payShort.replace("/day", `/${t.perDay}`).replace("/mo", `/${t.perMonth}`),
      statusNote:
        row.status === "Applied"
          ? t.appliedDaysAgo.replace("{{days}}", "2")
          : row.status === "Shortlisted"
            ? t.shortlistedToday
            : row.statusNote,
    }));
    const appliedMerged = [...appliedFromStorage];
    for (const row of localizedSeed) {
      if (!appliedMerged.some((r) => r.title === row.title)) {
        appliedMerged.push(row);
      }
    }

    const confirmed: ActivityRow[] = [
      {
        id: "conf-1",
        jobId: "conf-1",
        title: "Helper / Beldar",
        company: "Northwind Logistics",
        location: "Delhi",
        payShort: `₹600/${t.perDay}`,
        letter: "H",
        color: "bg-emerald-600",
        status: "Confirmed",
        statusNote: t.startsNextWeek,
      },
    ];

    const completed: ActivityRow[] = [
      {
        id: "done-1",
        jobId: "done-1",
        title: "Painter (Interior)",
        company: "ColourCraft",
        location: "Noida",
        payShort: `₹16,500/${t.perMonth}`,
        letter: "P",
        color: "bg-violet-600",
        status: "Completed",
        statusNote: `${t.paidInFull} · 3 ${t.weeksAgo}`,
      },
    ];

    return {
      applied: appliedMerged,
      confirmed,
      completed,
    };
  }, [source, appliedTick, t]);

  const refreshApplied = useCallback(() => setAppliedTick((n) => n + 1), []);

  return (
    <div className="space-y-8 pb-12">
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 px-4 py-8 text-white shadow-lg sm:px-8 sm:py-10">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-100">
          <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
            <BriefcaseIcon className="h-4 w-4" />
          </span>
          {t.workerHome}
        </div>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {t.findDailyWorkNearYou}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-emerald-50 sm:text-base">
          {liveCount.toLocaleString("en-IN")} {t.jobsAvailableNow}
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { k: "₹2.4 Cr+", sub: t.wagesPaidThisMonth },
            { k: liveCount.toLocaleString("en-IN"), sub: t.liveJobOpenings },
            { k: "50,000+", sub: t.registeredWorkers },
          ].map((s) => (
            <div
              key={s.sub}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm"
            >
              <div className="text-lg font-bold tabular-nums sm:text-xl">{s.k}</div>
              <div className="text-xs text-emerald-100">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          <label className="flex min-h-[44px] flex-1 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3">
            <PinIcon className="h-5 w-5 shrink-0 text-zinc-400" />
            <select
              className="w-full bg-transparent py-2 text-sm font-medium text-zinc-900 outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {LOCATION_OPTIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-h-[44px] flex-1 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3">
            <BriefcaseIcon className="h-5 w-5 shrink-0 text-zinc-400" />
            <select
              className="w-full bg-transparent py-2 text-sm font-medium text-zinc-900 outline-none"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              {JOB_TYPE_OPTIONS.map((jt) => (
                <option key={jt.id} value={jt.id}>
                  {jt.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-h-[44px] flex-[1.2] items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3">
            <SearchIcon className="h-5 w-5 shrink-0 text-zinc-400" />
            <input
              type="search"
              placeholder={t.searchByTrade}
              className="w-full py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TRADE_CHIPS.map((c) => {
            const active = chip === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setChip(c.id)}
                className={[
                  "shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition sm:text-sm",
                  active
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50",
                ].join(" ")}
              >
                {t[c.key as keyof typeof t] ?? c.key}
              </button>
            );
          })}
        </div>
      </section>

      <section id="live-openings">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-lg font-semibold text-emerald-700">
            {t.liveJobOpenings} ({filtered.length} {filtered.length === 1 ? t.job : t.jobs})
          </h2>
          <a
            href="#live-openings"
            className="text-sm font-semibold text-emerald-700 hover:underline"
          >
            {t.viewAll} →
          </a>
        </div>
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-600">
              {t.noJobsMatchFilters}
            </div>
          ) : (
            filtered.map((job) => (
              <OpeningCard
                key={job.id}
                job={job}
                onApplied={refreshApplied}
              />
            ))
          )}
        </div>
      </section>

      <section>
        <div className="relative flex items-center gap-3 py-2">
          <div className="h-px flex-1 border-t border-dashed border-zinc-300" />
          <span className="shrink-0 text-[11px] font-semibold tracking-wider text-zinc-500">
            {t.yourJobActivity}
          </span>
          <div className="h-px flex-1 border-t border-dashed border-zinc-300" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 bg-slate-800 px-4 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <BriefcaseIcon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold">
                  {t.myJobs} ({activityRows.applied.length} {t.active})
                </div>
                <p className="text-xs text-slate-300">
                  {t.trackApplications}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {(
                [
                  ["applied", t.applied],
                  ["confirmed", t.confirmed],
                  ["completed", t.completed],
                ] as const
              ).map(([key, label]) => {
                const active = activityTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActivityTab(key)}
                    className={[
                      "rounded-lg px-3 py-2 text-xs font-semibold sm:text-sm",
                      active
                        ? "bg-emerald-500 text-white"
                        : "border border-slate-600 bg-transparent text-slate-200 hover:bg-slate-700",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="divide-y divide-zinc-100 p-3 sm:p-4">
            {activityRows[activityTab].length === 0 ? (
              <p className="py-8 text-center text-sm text-zinc-500">{t.nothingHereYet}</p>
            ) : (
              activityRows[activityTab].map((row) => (
                <ActivityRowCard key={row.id} row={row} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function OpeningCard({
  job,
  onApplied,
}: {
  job: PostedJob;
  onApplied: () => void;
}) {
  const t = useI18nText();
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setApplied(hasApplied(job.id));
  }, [job.id]);

  const urgent = job.workersNeeded >= 5;
  const company = companyLabel(job.postedByEmail);

  const apply = () => {
    addAppliedJobId(job.id);
    setApplied(true);
    onApplied();
  };

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-stretch sm:justify-between sm:gap-6 sm:p-5">
      <div className="flex min-w-0 flex-1 gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-lg font-bold text-white ${badgeColor(job)}`}
        >
          {letterFor(job)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-zinc-900">{job.title}</h3>
            <span className="text-xs font-semibold text-emerald-700">✓ {t.verified}</span>
            {urgent ? (
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold uppercase text-orange-800">
                {t.urgent}
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 text-sm font-medium text-zinc-700">{company}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1">
              <PinIcon className="h-3.5 w-3.5" />
              {job.location}
            </span>
            <span>
              {job.wageType === "per_day"
                ? t.dailyWage
                : job.wageType === "per_month"
                  ? t.monthly
                  : t.contract}
            </span>
            <span>
              {job.workersNeeded} {job.workersNeeded === 1 ? t.opening : t.openings}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-zinc-100 pt-3 text-xs text-zinc-500">
            <span>{timeAgo(job.createdAt, t)}</span>
            <button
              type="button"
              className="inline-flex items-center gap-1 font-medium text-zinc-600 hover:text-emerald-700"
              aria-label={t.saveJob}
            >
              <HeartIcon className="h-4 w-4" />
              {t.save}
            </button>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-stretch justify-center gap-3 border-t border-zinc-100 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
        <div className="text-right sm:min-w-[140px]">
          <div className="text-lg font-bold tabular-nums text-zinc-900">{formatPay(job, t)}</div>
        </div>
        <button
          type="button"
          disabled={applied}
          onClick={apply}
          className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:cursor-default disabled:bg-emerald-400/80"
        >
          {applied ? t.applied : t.applyNow}
        </button>
      </div>
    </article>
  );
}

function ActivityRowCard({ row }: { row: ActivityRow }) {
  const t = useI18nText();
  const pill =
    row.status === "Applied"
      ? "bg-blue-100 text-blue-800"
      : row.status === "Shortlisted"
        ? "bg-orange-100 text-orange-800"
        : row.status === "Confirmed"
          ? "bg-emerald-100 text-emerald-800"
          : "bg-zinc-200 text-zinc-800";

  return (
    <div className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3">
        <div
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${row.color}`}
        >
          {row.letter}
        </div>
        <div>
          <div className="font-semibold text-zinc-900">{row.title}</div>
          <div className="text-sm text-zinc-600">
            {row.company} · {row.location}
          </div>
          <div className="mt-1 text-xs text-zinc-500">{row.statusNote}</div>
        </div>
      </div>
      <div className="flex shrink-0 flex-row items-center justify-between gap-4 sm:flex-col sm:items-end">
        <div className="text-sm font-bold tabular-nums text-zinc-900">{row.payShort}</div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${pill}`}>
          {row.status === "Applied"
            ? t.applied
            : row.status === "Shortlisted"
              ? t.shortlisted
              : row.status === "Confirmed"
                ? t.confirmed
                : t.completed}
        </span>
      </div>
    </div>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="9" r="2.5" fill="currentColor" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M4 9a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-6.715-4.35-9-8.5C1.5 8.5 4.5 5 8.5 5c2.1 0 3.5 1.5 3.5 1.5S13.4 5 15.5 5c4 0 7 3.5 6 7.5-2.285 4.15-9 8.5-9 8.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
