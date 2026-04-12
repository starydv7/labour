export const siteConfig = {
  name: "Labour",
  landing: {
    tag: "India's #1 Worker Jobs Platform",
    headline: "Find, apply, and track labour jobs in one place.",
    description:
      "Skilled and general workers across construction, logistics, and more can discover nearby work opportunities with clear pay details.",
    primaryCta: { href: "/auth/signup", label: "Register as Worker" },
    secondaryCta: { href: "/jobs", label: "Browse Jobs" },
    topCtas: {
      register: { href: "/auth/signup", label: "Register worker" },
      getStarted: { href: "/auth/signup", label: "Get started free" },
    },
    stats: [
      { label: "Active workers", value: "124", meta: "8 today" },
      { label: "Open shifts", value: "18", meta: "6 urgent" },
      { label: "Sites running", value: "7", meta: "Active" },
      { label: "Pending approvals", value: "5", meta: "Action needed" },
    ],
    recent: [
      { initials: "RK", name: "Rajesh Kumar", role: "Manpower Hiring", status: "Active" },
      { initials: "PS", name: "Priya Singh", role: "Electrician", status: "Pending" },
      { initials: "AM", name: "Arjun Mehta", role: "Plumber", status: "In Review" },
    ],
  },
} as const;
