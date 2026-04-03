"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";

type SignupRole = "worker" | "contractor";

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <AuthShell title="Create account" subtitle="Register in a couple of minutes.">
          <div className="text-sm text-zinc-600">Loading…</div>
        </AuthShell>
      }
    >
      <SignupInner />
    </Suspense>
  );
}

function SignupInner() {
  const { signUp } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialRole = useMemo<SignupRole>(() => {
    const role = searchParams.get("role");
    if (!role) return "worker";
    if (role === "worker") return "worker";
    return "contractor";
  }, [searchParams]);

  const [role, setRole] = useState<SignupRole>(initialRole);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = role === "worker" ? "Worker registration" : "Employer / Contractor registration";
  const subtitle =
    role === "worker"
      ? "Find daily work and get paid on time."
      : "Hire, schedule, and manage labour efficiently.";

  return (
    <AuthShell title={title} subtitle={subtitle}>
      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setIsSubmitting(true);
          try {
            await signUp({ name, email, password, role });
            router.replace("/dashboard");
          } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to create account.");
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setRole("worker")}
            className={[
              "min-h-[44px] rounded-xl border px-4 py-3 text-sm font-medium transition",
              role === "worker"
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50",
            ].join(" ")}
          >
            I'm a Worker
          </button>
          <button
            type="button"
            onClick={() => setRole("contractor")}
            className={[
              "min-h-[44px] rounded-xl border px-4 py-3 text-sm font-medium transition",
              role === "contractor"
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50",
            ].join(" ")}
          >
            I'm an Employer / Contractor
          </button>
        </div>

        <Input
          label="Full name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          hint="Frontend-only demo. Password isn’t stored."
          required
          className="focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
        />

        {error ? <div className="text-sm text-red-600">{error}</div> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating…" : role === "worker" ? "Register as Worker" : "Register Free"}
        </button>

        <div className="text-sm text-zinc-600">
          Already have an account?{" "}
          <Link className="font-medium text-emerald-700 hover:underline" href="/auth/login">
            Sign in
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

