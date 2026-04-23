import { HeroSection } from "@/components/hero-section";
import { RenewableEnergyProgress } from "@/components/renewable-energy-progress";
import { MSMEClustersMap } from "@/components/msme-clusters-map";
import { MSMEEnergyImpact } from "@/components/msme-energy-impact";
import { EOIAssessmentDashboard } from "@/components/eoi-assessment-dashboard";
import { MatchmakingPlatform } from "@/components/matchmaking-platform";
import { TechnologyCompendium } from "@/components/technology-compendium";
import { EcosystemBuilding } from "@/components/ecosystem-building";
import { LoginSection } from "@/components/login-section";

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <HeroSection />
      <MSMEClustersMap />
      <EOIAssessmentDashboard />
      <RenewableEnergyProgress />
      <MSMEEnergyImpact />
      <MatchmakingPlatform />
      <TechnologyCompendium />
      <EcosystemBuilding />
      <LoginSection />
    </main>
  );
}
