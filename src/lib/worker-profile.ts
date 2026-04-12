export type WorkerProfile = {
  profileImageDataUrl?: string;
  fullName: string;
  phone: string;
  city: string;
  trade: string;
  experienceYears: string;
  preferredWage: string;
  availability: "immediate" | "within_week" | "part_time";
  skills: string;
  about: string;
  updatedAt: string;
};

const STORAGE_KEY = "labour.workerProfilesByEmail";

type WorkerProfileMap = Record<string, WorkerProfile>;

function loadMap(): WorkerProfileMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as WorkerProfileMap;
  } catch {
    return {};
  }
}

function saveMap(map: WorkerProfileMap): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function loadWorkerProfile(email: string): WorkerProfile | null {
  if (!email) return null;
  const map = loadMap();
  return map[email.toLowerCase()] ?? null;
}

export function saveWorkerProfile(email: string, profile: Omit<WorkerProfile, "updatedAt">): WorkerProfile {
  const map = loadMap();
  const full: WorkerProfile = { ...profile, updatedAt: new Date().toISOString() };
  map[email.toLowerCase()] = full;
  saveMap(map);
  return full;
}
