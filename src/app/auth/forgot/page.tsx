"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18nText } from "@/lib/app-preferences";
import { useAuth } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const t = useI18nText();
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <AuthShell
      title={t.resetPassword}
      subtitle={t.resetSubtitle}
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setToken(null);
          setIsSubmitting(true);
          try {
            const res = await requestPasswordReset(email);
            setToken(res.token);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to request reset.");
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

        {error ? <div className="text-sm text-red-600">{error}</div> : null}

        <Button disabled={isSubmitting} type="submit" className="sm:w-auto">
          {isSubmitting ? t.generating : t.generateResetLink}
        </Button>

        {token ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            <div className="font-medium">{t.resetLinkGenerated}</div>
            <div className="mt-2 break-all text-xs">
              {t.open ?? "Open"}{" "}
              <Link className="underline" href={`/auth/reset?token=${encodeURIComponent(token)}`}>
                /auth/reset?token={token}
              </Link>
            </div>
          </div>
        ) : null}

        <div className="text-sm text-zinc-600">
          {t.backTo}{" "}
          <Link className="font-medium text-zinc-950" href="/auth/login">
            {t.signInAction}
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

