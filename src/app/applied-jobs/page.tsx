"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DEMO_OPENINGS } from "@/components/find-work/demo-openings";
import { Protected } from "@/components/auth/protected";
import { LandingNavbar, LANDING_NAVBAR_OFFSET_PX } from "@/components/landing/landing-navbar";
import { useI18nText } from "@/lib/app-preferences";
import { type PostedJob, loadPostedJobs } from "@/lib/posted-jobs";
import { loadAppliedJobIds } from "@/lib/worker-applications";

export default function AppliedJobsPage() {
  return (
    <Protected>
      <AppliedJobsInner />
    </Protected>
  );
}

function AppliedJobsInner() {
  const t = useI18nText();
  const [jobs, setJobs] = useState<PostedJob[]>([]);

  useEffect(() => {
    setJobs(loadPostedJobs());
  }, []);

  const appliedJobs = useMemo(() => {
    const ids = loadAppliedJobIds();
    const merged = jobs.length > 0 ? jobs : DEMO_OPENINGS;
    return ids
      .map((id) => merged.find((j) => j.id === id))
      .filter(Boolean) as PostedJob[];
  }, [jobs]);

  return (
    <div className="min-h-full bg-[#f7fafc] text-zinc-900">
      <LandingNavbar />
      <div
        className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 pb-12 sm:w-[90%] sm:px-0"
        style={{ paddingTop: LANDING_NAVBAR_OFFSET_PX }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">{t.appliedJobsTitle}</h1>
          <p className="mt-1 text-sm text-zinc-600">
            {t.appliedJobsSubtitle}
          </p>
        </div>

        {appliedJobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-600">
            {t.noAppliedJobs}{" "}
            <Link href="/jobs" className="font-semibold text-emerald-700 hover:underline">
              {t.browseJobs}
            </Link>
            .
          </div>
        ) : (
          <div className="space-y-4">
            {appliedJobs.map((job) => (
              <article
                key={job.id}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-zinc-900">{job.title}</h2>
                    <p className="mt-1 text-sm text-zinc-600">
                      {job.trade} · {job.location}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Posted by {labelFromEmail(job.postedByEmail)}
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                    {t.appliedJobs}
                  </div>
                </div>
                {job.description ? (
                  <p className="mt-3 text-sm text-zinc-700">{job.description}</p>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-500">
                  <span>
                    Pay: ₹{job.wageAmount}{" "}
                    {job.wageType === "per_day" ? "/ day" : job.wageType === "per_month" ? "/ month" : "(contract)"}
                  </span>
                  <span>{job.workersNeeded} opening{job.workersNeeded === 1 ? "" : "s"}</span>
                  <span>Applied after posting {new Date(job.createdAt).toLocaleString()}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function labelFromEmail(email: string) {
  const domain = email.split("@")[1]?.split(".")[0] ?? "company";
  return `${domain.charAt(0).toUpperCase()}${domain.slice(1)}`;
}

