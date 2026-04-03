export type PostedJob = {
  id: string;
  createdAt: string;
  title: string;
  trade: string;
  location: string;
  siteAddress: string;
  workersNeeded: number;
  wageType: "per_day" | "per_month" | "contract";
  wageAmount: string;
  startDate: string;
  duration: string;
  description: string;
  requirements: string;
  postedByEmail: string;
};

const STORAGE_KEY = "labour.postedJobs";

export function loadPostedJobs(): PostedJob[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PostedJob[];
  } catch {
    return [];
  }
}

function newId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `job_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function savePostedJob(job: Omit<PostedJob, "id" | "createdAt">): PostedJob {
  const full: PostedJob = {
    ...job,
    id: newId(),
    createdAt: new Date().toISOString(),
  };
  const list = loadPostedJobs();
  list.unshift(full);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return full;
}
