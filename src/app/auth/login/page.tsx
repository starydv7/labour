"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEMO_ACCOUNTS } from "@/config/demo-auth";
import { useI18nText } from "@/lib/app-preferences";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const t = useI18nText();
  return (
    <Suspense
      fallback={
        <AuthShell title={t.signInAction} subtitle={t.welcomeBack}>
          <div className="text-sm text-zinc-600">{t.loading}</div>
        </AuthShell>
      }
    >
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const { signIn, user } = useAuth();
  const t = useI18nText();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = useMemo(() => searchParams.get("next") || "/jobs", [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) router.replace(next);
  }, [user, router, next]);

  return (
    <AuthShell title={t.signInAction} subtitle={t.welcomeBack}>
      <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
        <div className="font-semibold text-emerald-900">{t.demoAccounts}</div>
        <ul className="mt-2 space-y-2 text-xs text-emerald-900/90">
          {DEMO_ACCOUNTS.map((a) => (
            <li key={a.email}>
              <span className="font-medium">{t.workerLabel}:</span>{" "}
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
          label={t.emailLabel}
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
        />
        <Input
          label={t.passwordLabel}
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
            {isSubmitting ? t.saving : t.signInAction}
          </Button>
          <Link
            className="text-sm text-zinc-600 hover:text-zinc-950"
            href="/auth/forgot"
          >
            {t.forgotPassword}
          </Link>
        </div>

        <div className="text-sm text-zinc-600">
          {t.dontHaveAccount}{" "}
          <Link className="font-medium text-zinc-950" href="/auth/signup">
            {t.createOne}
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

