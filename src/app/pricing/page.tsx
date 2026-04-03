import Link from "next/link";
import { LandingNavbar, LANDING_NAVBAR_OFFSET_PX } from "@/components/landing/landing-navbar";

export default function PricingPage() {
  return (
    <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
      <LandingNavbar />
      <div style={{ paddingTop: LANDING_NAVBAR_OFFSET_PX }}>
        <div className="mx-auto w-[min(100%,calc(100%-1rem))] max-w-[1600px] px-2 pb-10 pt-6 sm:w-[90%] sm:px-0 sm:pt-10">
        <h1 className="text-2xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-3 text-sm text-zinc-600">
          This is a placeholder page. Next step: add plans + checkout.
        </p>
        <div className="mt-6">
          <Link
            className="text-sm font-medium text-emerald-700 hover:underline"
            href="/"
          >
            Back to home
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

