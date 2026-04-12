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
] as const;
