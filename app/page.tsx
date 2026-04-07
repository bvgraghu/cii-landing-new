import { HeroSection } from "@/components/hero-section";
import { RenewableEnergyProgress } from "@/components/renewable-energy-progress";
import { MSMEClustersMap } from "@/components/msme-clusters-map";
import { MSMEEnergyImpact } from "@/components/msme-energy-impact";
import { EOIAssessmentDashboard } from "@/components/eoi-assessment-dashboard";

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <HeroSection />
      <MSMEClustersMap />
      <EOIAssessmentDashboard />
      <RenewableEnergyProgress />
      <MSMEEnergyImpact />
    </main>
  );
}
