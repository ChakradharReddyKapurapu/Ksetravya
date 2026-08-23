import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import { useJobs } from '../../../context/JobsContext';
import { JobsHeader } from './JobsHeader';
import { JobsHero } from './JobsHero';
import { JobsSearchAndFilterBar } from './JobsSearchAndFilterBar';
import { JobCategoriesGrid } from './JobCategoriesGrid';
import { JobCardsGrid } from './JobCardsGrid';
import { WorkerDiscoveryGrid } from './WorkerDiscoveryGrid';
import { FarmerWorkerConnectionWorkflow } from './FarmerWorkerConnectionWorkflow';
import { WorkMarketSalaryAnalytics } from './WorkMarketSalaryAnalytics';
import { WorkNearYouMapSection } from './WorkNearYouMapSection';
import { TrustSafetySection } from './TrustSafetySection';
import { EcosystemConnectionsSection } from './EcosystemConnectionsSection';
import { JobDetailModal } from './JobDetailModal';
import { ApplyJobModal } from './ApplyJobModal';
import { WorkerDashboardModal } from './WorkerDashboardModal';
import { PostJobModal } from './PostJobModal';
import { FarmerJobsDashboard } from './FarmerJobsDashboard';
import { CartDrawer } from '../../../components/cart/CartDrawer';
import { JobsWorldCanvas } from '../../../three/jobs/JobsWorldCanvas';
import { Briefcase, Navigation, Users } from 'lucide-react';

export const JobsWorldView = () => {
  const { currentWorld } = useWorld();
  const { travelHUDMessage, activeRole } = useJobs();

  const isTransitioning =
    currentWorld === 'transition_to_jobs' || currentWorld === 'transition_to_farm';

  return (
    <div className="relative min-h-screen bg-[#0a140a] text-cream-100 selection:bg-emerald-500/30 selection:text-white">
      {/* Top Fixed Header */}
      <JobsHeader />

      {/* Travel HUD Toast */}
      {travelHUDMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500 text-stone-950 font-display font-bold text-xs shadow-2xl border border-emerald-300">
            <Navigation className="w-4 h-4 animate-spin text-stone-950" />
            <span>{travelHUDMessage}</span>
          </div>
        </div>
      )}

      {/* Cinematic Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <div className="p-6 rounded-3xl bg-forest-950/95 border border-emerald-400/50 shadow-2xl flex flex-col items-center text-center max-w-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-3 animate-spin">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              {currentWorld === 'transition_to_jobs'
                ? 'Entering Agricultural Work Morning...'
                : 'Returning to Farm...'}
            </h3>
            <p className="text-xs text-emerald-300/80 font-mono mt-1">
              Passing farm gate, arriving workers & morning crop fields
            </p>
          </div>
        </div>
      )}

      {/* 3D Fixed Viewport Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <JobsWorldCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a140a]/20 via-[#0a140a]/50 to-[#0a140a]/90 pointer-events-none" />
      </div>

      {/* Scrollable Content Layers */}
      <div className="relative z-10 pt-20 pb-20">
        {/* Section 1: Hero Stage */}
        <JobsHero />

        {/* Section 2: Search & Filter Bar */}
        <JobsSearchAndFilterBar />

        {/* Section 3: 12 Specialized Job Categories */}
        <JobCategoriesGrid />

        {/* Section 4: Available Jobs Board (Worker View) */}
        <JobCardsGrid />

        {/* Section 5: Worker Discovery (Farmer View) */}
        <WorkerDiscoveryGrid />

        {/* Section 6: 6-Step Farmer ↔ Worker Matchmaking Flow */}
        <FarmerWorkerConnectionWorkflow />

        {/* Section 7: Salary Index & Benchmark Charts */}
        <WorkMarketSalaryAnalytics />

        {/* Section 8: Proximity / Work Near You Matches */}
        <WorkNearYouMapSection />

        {/* Section 9: Safety, Trust & Verified Standards */}
        <TrustSafetySection />

        {/* Section 10: Connected Ecosystem Bridges */}
        <EcosystemConnectionsSection />
      </div>

      {/* Modals & Cart Drawer */}
      <JobDetailModal />
      <ApplyJobModal />
      <WorkerDashboardModal />
      <PostJobModal />
      <FarmerJobsDashboard />
      <CartDrawer />

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-forest-950/95 backdrop-blur-xl py-12 px-4 text-xs text-cream-200/60 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-display font-semibold">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>AGRI NEXUS</span>
            <span className="text-emerald-400 text-[10px]">JOBS & AGRICULTURAL WORK</span>
          </div>
          <p>
            All wage rates and labor listings are <strong>DEMO AGRICULTURAL WORK DATA</strong> for preview purposes.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[10px] text-emerald-400 hover:underline cursor-pointer"
          >
            Back to Top ↑
          </button>
        </div>
      </footer>
    </div>
  );
};
