"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthShell title="Set a new password" subtitle="Loading reset link…">
          <div className="text-sm text-zinc-600">Loading…</div>
        </AuthShell>
      }
    >
      <ResetInner />
    </Suspense>
  );
}

function ResetInner() {
  const { resetPassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <AuthShell
      title="Set a new password"
      subtitle="Paste the reset token from the reset link and choose a new password."
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setIsSubmitting(true);
          try {
            await resetPassword({ token, newPassword });
            router.replace("/dashboard");
          } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to reset password.");
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <Input
          label="Reset token"
          value={token}
          readOnly
          hint="In a real app you’d receive this via email."
        />
        <Input
          label="New password"
          type="password"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="At least 6 characters"
          required
        />

        {error ? <div className="text-sm text-red-600">{error}</div> : null}

        <Button disabled={isSubmitting} type="submit" className="sm:w-auto">
          {isSubmitting ? "Saving…" : "Reset password"}
        </Button>

        <div className="text-sm text-zinc-600">
          Back to{" "}
          <Link className="font-medium text-zinc-950" href="/auth/login">
            sign in
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

