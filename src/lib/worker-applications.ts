const STORAGE_KEY = "labour.workerAppliedJobIds";

export function loadAppliedJobIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

export function addAppliedJobId(jobId: string): void {
  const set = new Set(loadAppliedJobIds());
  set.add(jobId);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

export function hasApplied(jobId: string): boolean {
  return loadAppliedJobIds().includes(jobId);
}
