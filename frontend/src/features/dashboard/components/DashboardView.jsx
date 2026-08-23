import React, { useState } from 'react';
import { Navbar } from '../../../components/layout/Navbar';
import { MobileMenu } from '../../../components/layout/MobileMenu';
import { DashboardHero } from './DashboardHero';
import { FarmOverviewWidget } from './FarmOverviewWidget';
import { WeatherWidget } from './WeatherWidget';
import { MarketPriceWidget } from './MarketPriceWidget';
import { ProfitabilityWidget } from './ProfitabilityWidget';
import { QuickActionsGrid } from './QuickActionsGrid';
import { SavedItemsWidget } from './SavedItemsWidget';
import { RecentActivityWidget } from './RecentActivityWidget';
import { FarmJourneyWorkflow } from './FarmJourneyWorkflow';

export const DashboardView = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-950 text-cream-100 selection:bg-emerald-500 selection:text-stone-950 font-sans pb-20 relative">
      {/* Top Navigation */}
      <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Dashboard Canvas Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-6">
        {/* 1. Dashboard Hero & Personalized Greeting */}
        <DashboardHero />

        {/* 2. Farm Overview Card */}
        <FarmOverviewWidget />

        {/* 3. Three-Column Key Operational Widgets: Weather, Prices, Profitability */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WeatherWidget />
          <MarketPriceWidget />
          <ProfitabilityWidget />
        </div>

        {/* 4. Quick Actions Hub */}
        <QuickActionsGrid />

        {/* 5. Two-Column Bookmarks & Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SavedItemsWidget />
          <RecentActivityWidget />
        </div>

        {/* 6. The Connected Farm Journey */}
        <FarmJourneyWorkflow />
      </main>
    </div>
  );
};
