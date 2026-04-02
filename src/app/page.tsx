export default function Home() {
  return (
    <div className="min-h-full bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-10 sm:px-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              L
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Labour</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Hire, schedule, and pay—faster
              </div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-zinc-600 dark:text-zinc-300 sm:flex">
            <a className="hover:text-zinc-950 dark:hover:text-white" href="#features">
              Features
            </a>
            <a className="hover:text-zinc-950 dark:hover:text-white" href="#workflow">
              Workflow
            </a>
            <a className="hover:text-zinc-950 dark:hover:text-white" href="#get-started">
              Get started
            </a>
          </nav>
        </header>

        <main className="flex flex-1 flex-col">
          <section className="pt-14 sm:pt-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Next.js + Tailwind starter, customized for Labour
            </div>
            <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              A modern labour management app for teams that move fast.
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-300">
              Track jobs, workers, and schedules in one place. This project is set up with
              Next.js App Router, TypeScript, Tailwind, and ESLint—ready for you to add auth,
              database, and core workflows.
            </p>

            <div
              id="get-started"
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                href="/dashboard"
              >
                Open dashboard
              </a>
              <a
                className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
                href="/jobs"
              >
                Browse jobs
              </a>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 sm:ml-2">
                Tip: add Clerk/Auth.js + Postgres next.
              </div>
            </div>
          </section>

          <section id="features" className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-3">
            {[
              {
                title: "Jobs & sites",
                desc: "Create jobs, assign sites, and keep notes, attachments, and status in one timeline.",
              },
              {
                title: "Workers & scheduling",
                desc: "Assign workers to shifts, prevent conflicts, and track hours without spreadsheets.",
              },
              {
                title: "Time & payroll export",
                desc: "Capture approvals, then export clean summaries for payroll or invoicing.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="text-sm font-semibold">{card.title}</div>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {card.desc}
                </p>
              </div>
            ))}
          </section>

          <section
            id="workflow"
            className="mt-14 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30"
          >
            <h2 className="text-base font-semibold">Suggested build order</h2>
            <ol className="mt-3 grid gap-2 text-sm text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
              <li className="rounded-xl bg-white px-4 py-3 dark:bg-zinc-950">
                1) Auth + org/workspace model
              </li>
              <li className="rounded-xl bg-white px-4 py-3 dark:bg-zinc-950">
                2) Jobs, sites, workers tables
              </li>
              <li className="rounded-xl bg-white px-4 py-3 dark:bg-zinc-950">
                3) Scheduling + timesheets
              </li>
              <li className="rounded-xl bg-white px-4 py-3 dark:bg-zinc-950">
                4) Payroll/invoicing exports
              </li>
            </ol>
          </section>
        </main>

        <footer className="mt-12 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Labour</div>
          <div className="flex items-center gap-3">
            <a className="hover:text-zinc-950 dark:hover:text-white" href="/health">
              Health
            </a>
            <a
              className="hover:text-zinc-950 dark:hover:text-white"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noreferrer"
            >
              Next.js docs
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
