"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEMO_ACCOUNTS } from "@/config/demo-auth";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <AuthShell title="Sign in" subtitle="Welcome back. Sign in to continue.">
          <div className="text-sm text-zinc-600">Loading…</div>
        </AuthShell>
      }
    >
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = useMemo(() => searchParams.get("next") || "/dashboard", [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <AuthShell title="Sign in" subtitle="Welcome back. Sign in to continue.">
      <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
        <div className="font-semibold text-emerald-900">Demo accounts</div>
        <ul className="mt-2 space-y-2 text-xs text-emerald-900/90">
          {DEMO_ACCOUNTS.map((a) => (
            <li key={a.email}>
              <span className="font-medium">{a.role === "worker" ? "Worker" : "Employer"}:</span>{" "}
              {a.email} / {a.password}
            </li>
          ))}
        </ul>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setIsSubmitting(true);
          try {
            await signIn({ email, password });
            router.replace(next);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to sign in.");
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        {error ? <div className="text-sm text-red-600">{error}</div> : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button disabled={isSubmitting} type="submit" className="sm:w-auto">
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
          <Link
            className="text-sm text-zinc-600 hover:text-zinc-950"
            href="/auth/forgot"
          >
            Forgot password?
          </Link>
        </div>

        <div className="text-sm text-zinc-600">
          Don’t have an account?{" "}
          <Link className="font-medium text-zinc-950" href="/auth/signup">
            Create one
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

