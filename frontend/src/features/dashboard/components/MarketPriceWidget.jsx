import React from 'react';
import { useFarmContext } from '../../../context/FarmContext';
import { useWorld } from '../../../context/WorldContext';
import { CROPS_DATA } from '../../market/data/demoMarketData';
import { TrendingUp, Store, ArrowRight, Calendar, MapPin } from 'lucide-react';

export const MarketPriceWidget = () => {
  const { farm } = useFarmContext();
  const { startTransitionToMarket } = useWorld();

  const farmCropName = farm?.currentCrop || 'Groundnut';

  // Match farm crop in market dataset
  const cropMatch =
    CROPS_DATA.find(
      (c) =>
        c?.name?.toLowerCase().includes(farmCropName.toLowerCase()) ||
        farmCropName.toLowerCase().includes(c?.name?.toLowerCase()) ||
        c?.id?.toLowerCase() === farm?.cropId?.toLowerCase()
    ) || CROPS_DATA[0];

  const pricePerKg = cropMatch?.price || cropMatch?.avgPrice || 78;
  const pricePerQuintal = pricePerKg * 100;
  const hasData = Boolean(cropMatch);

  return (
    <div className="p-6 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold font-display text-white text-sm">Market Mandi Prices</h3>
              <span className="text-[10px] text-cream-200/50 font-mono">
                {farm?.district || 'Guntur'} APMC Benchmarks
              </span>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono border border-amber-400/30">
            APMC Live
          </span>
        </div>

        {/* Content */}
        {hasData ? (
          <div className="py-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                  Current Crop Rate
                </span>
                <h4 className="text-base font-bold font-display text-white flex items-center gap-1.5">
                  <span>{cropMatch?.icon || '🌱'}</span>
                  <span>{cropMatch?.name || farmCropName}</span>
                </h4>
                <span className="text-[10px] font-mono text-cream-200/50 block mt-0.5">
                  {cropMatch?.variety || 'Standard APMC Grade'}
                </span>
              </div>

              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300">
                  ₹{Number(pricePerQuintal || 0).toLocaleString()}
                </div>
                <span className="text-[10px] font-mono text-cream-200/50">per Quintal (₹{pricePerKg}/kg)</span>
              </div>
            </div>

            {/* Market & Date */}
            <div className="p-3 rounded-2xl bg-forest-900/60 border border-white/5 space-y-1 text-[11px] font-mono">
              <div className="flex justify-between">
                <span className="text-cream-200/50 flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mandi:</span>
                </span>
                <span className="text-white font-bold">{farm?.district || 'Guntur'} Principal Yard</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream-200/50 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cream-200/60" />
                  <span>Price Date:</span>
                </span>
                <span className="text-emerald-300">Today (Session Active)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-xs font-mono text-cream-200/60">
            Market price data unavailable for current selection.
          </div>
        )}
      </div>

      {/* Button */}
      <button
        onClick={startTransitionToMarket}
        className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-display font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
      >
        <span>View Live Mandi Prices</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
