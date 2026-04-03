"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WorkerFindWork } from "@/components/find-work/worker-find-work";
import { Protected } from "@/components/auth/protected";
import { LandingNavbar, LANDING_NAVBAR_OFFSET_PX } from "@/components/landing/landing-navbar";
import { useAuth } from "@/lib/auth";
import { loadPostedJobs, type PostedJob } from "@/lib/posted-jobs";

export default function JobsPage() {
  return (
    <Protected>
      <JobsInner />
    </Protected>
  );
}

function JobsInner() {
  const { user } = useAuth();
  const isWorker = user?.role === "worker";
  const canPost = user?.role === "contractor";
  const [jobs, setJobs] = useState<PostedJob[]>([]);

  useEffect(() => {
    setJobs(loadPostedJobs());
  }, []);

  if (isWorker) {
    return (
      <div className="min-h-full bg-[#f7fafc] text-zinc-900">
        <LandingNavbar />
        <div
          className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 pb-10 sm:w-[90%] sm:px-0"
          style={{ paddingTop: LANDING_NAVBAR_OFFSET_PX }}
        >
          <WorkerFindWork jobs={jobs} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
      <LandingNavbar />
      <div
        className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 pb-10 sm:w-[90%] sm:px-0"
        style={{ paddingTop: LANDING_NAVBAR_OFFSET_PX }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900">Jobs & labour requirements</h1>
            <p className="mt-1 text-sm text-zinc-600">
              Posted requirements (demo: stored in this browser only).
            </p>
          </div>
          {canPost ? (
            <Link
              href="/jobs/post"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 sm:w-auto"
            >
              Post a requirement
            </Link>
          ) : null}
        </div>

        <main className="mt-8 space-y-4">
          {jobs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-600">
              No requirements posted yet.
              {canPost ? (
                <>
                  {" "}
                  <Link href="/jobs/post" className="font-medium text-emerald-700 hover:underline">
                    Post your first job
                  </Link>
                  .
                </>
              ) : (
                " Check back soon for openings."
              )}
            </div>
          ) : (
            jobs.map((job) => (
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
                  </div>
                  <div className="w-full text-left sm:w-auto sm:text-right">
                    <div className="text-sm font-semibold text-zinc-900">
                      ₹{job.wageAmount}{" "}
                      <span className="font-normal text-zinc-500">
                        {job.wageType === "per_day"
                          ? "/ day"
                          : job.wageType === "per_month"
                            ? "/ month"
                            : " (contract)"}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-500">
                      {job.workersNeeded} worker{job.workersNeeded === 1 ? "" : "s"} needed
                    </div>
                  </div>
                </div>
                {job.description ? (
                  <p className="mt-3 text-sm text-zinc-700 line-clamp-3">{job.description}</p>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-500">
                  {job.startDate ? <span>Starts: {job.startDate}</span> : null}
                  {job.duration ? <span>{job.duration}</span> : null}
                  <span>Posted {new Date(job.createdAt).toLocaleString()}</span>
                </div>
              </article>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
