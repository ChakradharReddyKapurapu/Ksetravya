import React from 'react';
import { useLand } from '../../../context/LandContext';
import {
  Waves,
  Zap,
  Droplets,
  Radio,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const PropertyViewHUD = () => {
  const {
    activeEnvironment,
    switchEnvironment,
    currentPropertyHUD,
    environmentPresets,
    setIsInquiryModalOpen,
    setSelectedParcel,
    allParcels,
  } = useLand();

  // Find associated demo parcel for quick inspection
  const handleQuickInquire = () => {
    const parcel =
      allParcels.find((p) => p.environmentType === activeEnvironment) || allParcels[0];
    setSelectedParcel(parcel);
    setIsInquiryModalOpen(true);
  };

  const handleInspect = () => {
    const parcel =
      allParcels.find((p) => p.environmentType === activeEnvironment) || allParcels[0];
    setSelectedParcel(parcel);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 pointer-events-none">
      {/* Top Floating Badge */}
      <div className="flex justify-center mb-6 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-forest-950/80 border border-white/20 backdrop-blur-xl shadow-2xl text-xs font-display font-bold text-white tracking-wider">
          <span className="text-base">🌍</span>
          <span>LAND / LEASE</span>
          <span className="text-white/40">|</span>
          <span className="text-amber-400 font-mono text-[11px] tracking-widest uppercase">
            PROPERTY VIEW
          </span>
        </div>
      </div>

      {/* Main HUD Layout (Left Thumbnail Switcher + Center Floating Telemetry Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Environment Switcher Thumbnails (3 Cols) */}
        <div className="lg:col-span-3 space-y-3 pointer-events-auto flex lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
          {environmentPresets.map((preset) => {
            const isActive = activeEnvironment === preset.id;

            return (
              <button
                key={preset.id}
                onClick={() => switchEnvironment(preset.id)}
                className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all duration-300 backdrop-blur-xl cursor-pointer flex-shrink-0 w-48 lg:w-full group ${
                  isActive
                    ? 'bg-forest-950/90 border-emerald-400 shadow-xl shadow-emerald-950/60 ring-2 ring-emerald-400/40 scale-[1.02]'
                    : 'bg-forest-950/70 hover:bg-forest-900/80 border-white/10 text-cream-200/80 hover:border-amber-400/40'
                }`}
              >
                {/* Thumbnail Icon Box */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 transition-transform group-hover:scale-105 ${
                    isActive
                      ? 'bg-emerald-500/25 border border-emerald-400/60 text-emerald-300'
                      : 'bg-white/5 border border-white/10 text-white'
                  }`}
                >
                  {preset.icon}
                </div>

                <div className="truncate">
                  <span
                    className={`text-xs font-bold font-display block truncate ${
                      isActive ? 'text-emerald-300' : 'text-white'
                    }`}
                  >
                    {preset.thumbnailTitle}
                  </span>
                  <span className="text-[10px] font-mono text-cream-200/50 block truncate">
                    {preset.soilType === 'dry'
                      ? 'Arid Farmland'
                      : preset.hasRiver
                      ? 'River Basin'
                      : preset.hasCanal
                      ? 'Canal Network'
                      : 'Fertile Regur'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Center Floating Glass Property Telemetry Card (6 Cols) */}
        <div className="lg:col-span-6 pointer-events-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/85 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-300">
            {/* Property Title */}
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Active 3D Telemetry Environment</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight leading-snug">
                {currentPropertyHUD.title}
              </h2>
            </div>

            {/* Structured Property Telemetry Metrics Matrix (Matching Image) */}
            <div className="space-y-3.5 pt-2 border-t border-white/10 font-display">
              {/* Row 1: LAND TYPE */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🌱</span>
                  <div>
                    <span className="text-[10px] font-mono text-cream-200/50 uppercase tracking-wider block">
                      LAND TYPE
                    </span>
                    <span className="text-sm font-bold text-white tracking-wide">
                      {currentPropertyHUD.landType}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-amber-300 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  {currentPropertyHUD.acreage} Acres
                </span>
              </div>

              {/* Row 2: WATER ACCESS */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">💧</span>
                  <div>
                    <span className="text-[10px] font-mono text-cream-200/50 uppercase tracking-wider block">
                      WATER ACCESS
                    </span>
                    <span className="text-sm font-bold text-sky-300 tracking-wide flex items-center gap-1.5">
                      <span>{currentPropertyHUD.waterAccess}</span>
                    </span>
                  </div>
                </div>
                <Waves className="w-4 h-4 text-sky-400 animate-pulse" />
              </div>

              {/* Row 3: BOREWELL (With animated radio wave/pump indicator) */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🚰</span>
                  <div>
                    <span className="text-[10px] font-mono text-cream-200/50 uppercase tracking-wider block">
                      BOREWELL
                    </span>
                    <span className="text-sm font-bold text-amber-300 tracking-wide">
                      {currentPropertyHUD.borewell}
                    </span>
                  </div>
                </div>
                {currentPropertyHUD.hasBorewell ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold animate-pulse">
                    <Radio className="w-3 h-3 text-amber-400" />
                    <span>(( ACTIVE ))</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-cream-200/40">N/A</span>
                )}
              </div>

              {/* Row 4: IRRIGATION (With animated droplet) */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">💦</span>
                  <div>
                    <span className="text-[10px] font-mono text-cream-200/50 uppercase tracking-wider block">
                      IRRIGATION
                    </span>
                    <span className="text-sm font-bold text-emerald-300 tracking-wide">
                      {currentPropertyHUD.irrigation}
                    </span>
                  </div>
                </div>
                {currentPropertyHUD.hasDrip ? (
                  <Droplets className="w-4 h-4 text-emerald-400 animate-bounce" />
                ) : (
                  <span className="text-[10px] font-mono text-cream-200/40">GRAVITY / FLOOD</span>
                )}
              </div>

              {/* Row 5: PRICE */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">₹</span>
                  <div>
                    <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider block">
                      PRICE
                    </span>
                    <span className="text-base font-black text-white font-mono">
                      {currentPropertyHUD.price}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  VERIFIED TITLE
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleInspect}
                className="flex-1 py-2.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 border border-white/10 text-cream-100 font-display font-semibold text-xs transition-colors cursor-pointer text-center"
              >
                Inspect Soil & Deeds
              </button>

              <button
                onClick={handleQuickInquire}
                className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display text-xs shadow-xl transition-all hover:scale-105 cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <span>Request Lease</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Info Quick Tips (3 Cols) */}
        <div className="lg:col-span-3 space-y-3 pointer-events-auto hidden lg:block">
          <div className="p-5 rounded-3xl bg-forest-950/80 border border-white/10 backdrop-blur-xl space-y-2 text-xs font-mono">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Smart Environment Sync</span>
            </span>
            <p className="text-[11px] text-cream-200/80 font-body leading-relaxed">
              The 3D environment updates dynamically according to water rights, soil geology, and irrigation infrastructure of the selected parcel.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-forest-950/80 border border-white/10 backdrop-blur-xl space-y-2 text-xs font-mono">
            <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">
              Active Water Sources
            </span>
            <div className="space-y-1 text-[11px] text-cream-200/70">
              <div className="flex justify-between">
                <span>Riverfront:</span>
                <span className={currentPropertyHUD.hasRiver ? 'text-emerald-400 font-bold' : 'text-stone-500'}>
                  {currentPropertyHUD.hasRiver ? 'Connected' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Borewell Pump:</span>
                <span className={currentPropertyHUD.hasBorewell ? 'text-amber-400 font-bold' : 'text-stone-500'}>
                  {currentPropertyHUD.hasBorewell ? 'Operational' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Precision Drip:</span>
                <span className={currentPropertyHUD.hasDrip ? 'text-sky-400 font-bold' : 'text-stone-500'}>
                  {currentPropertyHUD.hasDrip ? 'Installed' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
