export const siteConfig = {
  name: "Labour",
  landing: {
    tag: "India's #1 Workforce Management Platform",
    headline: "Hire, manage & pay labour at any scale.",
    description:
      "Connect vendors, contractors and workers across construction, manufacturing, logistics and more. From onboarding to payroll—everything in one platform.",
    primaryCta: { href: "/auth/signup", label: "Register as Vendor" },
    secondaryCta: { href: "/jobs", label: "Browse Workers" },
    topCtas: {
      register: { href: "/auth/signup", label: "Register vendor" },
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
