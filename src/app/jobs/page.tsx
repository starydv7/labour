"use client";

import { useEffect, useState } from "react";
import { WorkerFindWork } from "@/components/find-work/worker-find-work";
import { Protected } from "@/components/auth/protected";
import { LandingNavbar, LANDING_NAVBAR_OFFSET_PX } from "@/components/landing/landing-navbar";
import { loadPostedJobs, type PostedJob } from "@/lib/posted-jobs";

export default function JobsPage() {
  return (
    <Protected>
      <JobsInner />
    </Protected>
  );
}

function JobsInner() {
  const [jobs, setJobs] = useState<PostedJob[]>([]);

  useEffect(() => {
    setJobs(loadPostedJobs());
  }, []);

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
