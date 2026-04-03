/**
 * Frontend-only demo logins. Replace with real API auth later.
 */
export const DEMO_ACCOUNTS = [
  {
    email: "worker@labour.demo",
    password: "Labour123!",
    name: "Ravi Kumar",
    role: "worker" as const,
  },
  {
    email: "employer@labour.demo",
    password: "Labour123!",
    name: "Priya Sharma",
    role: "contractor" as const,
  },
] as const;
