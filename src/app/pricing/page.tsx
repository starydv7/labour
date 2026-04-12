"use client";

import Link from "next/link";
import { LandingNavbar, LANDING_NAVBAR_OFFSET_PX } from "@/components/landing/landing-navbar";
import { useI18nText } from "@/lib/app-preferences";

export default function PricingPage() {
  const t = useI18nText();
  return (
    <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
      <LandingNavbar />
      <div style={{ paddingTop: LANDING_NAVBAR_OFFSET_PX }}>
        <div className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 pb-10 pt-6 sm:w-[90%] sm:px-0 sm:pt-10">
        <h1 className="text-2xl font-semibold tracking-tight">{t.pricingTitle}</h1>
        <p className="mt-3 text-sm text-zinc-600">
          {t.pricingPlaceholder}
        </p>
        <div className="mt-6">
          <Link
            className="text-sm font-medium text-emerald-700 hover:underline"
            href="/"
          >
            {t.backToHome}
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

