import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingHero } from "@/components/landing/landing-hero";

export default function Home() {
  return (
    <div className="min-h-full">
      <LandingNavbar />
      <LandingHero />
    </div>
  );
}
