"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Input } from "@/components/ui/input";
import { useI18nText } from "@/lib/app-preferences";
import { useAuth } from "@/lib/auth";

export default function SignupPage() {
  const t = useI18nText();
  return (
    <Suspense
      fallback={
        <AuthShell title={t.createAccount} subtitle={t.registerSubtitle}>
          <div className="text-sm text-zinc-600">{t.loading}</div>
        </AuthShell>
      }
    >
      <SignupInner />
    </Suspense>
  );
}

function SignupInner() {
  const t = useI18nText();
  const { signUp, user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = t.workerRegistration;
  const subtitle = t.registerSubtitle;

  useEffect(() => {
    if (user) router.replace("/jobs");
  }, [user, router]);

  return (
    <AuthShell title={title} subtitle={subtitle}>
      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setIsSubmitting(true);
          try {
            await signUp({ name, email, password, role: "worker" });
            router.replace("/jobs");
          } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to create account.");
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <Input
          label={t.fullNameLabel}
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/40"
        />
        <Input
          label={t.emailLabel}
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
          label={t.passwordLabel}
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
          {isSubmitting ? t.creating : t.registerAsWorker}
        </button>

        <div className="text-sm text-zinc-600">
          {t.alreadyHaveAccount}{" "}
          <Link className="font-medium text-emerald-700 hover:underline" href="/auth/login">
            {t.signInAction}
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

