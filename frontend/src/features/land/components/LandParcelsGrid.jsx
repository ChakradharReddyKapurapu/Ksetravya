import React from 'react';
import { useLand } from '../../../context/LandContext';
import {
  MapPin,
  Waves,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Gauge,
  Layers,
} from 'lucide-react';
import { FavoriteButton } from '../../../components/favorites/FavoriteButton';

export const LandParcelsGrid = () => {
  const { filteredParcels, setSelectedParcel, setIsInquiryModalOpen } = useLand();

  return (
    <section id="parcels-board" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono uppercase font-bold mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Verified Farmland Registry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Available Land Parcels for Lease ({filteredParcels.length})
          </h2>
        </div>
        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-400/20">
          DEMO FARMLAND LISTINGS
        </span>
      </div>

      {filteredParcels.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-forest-950/80 border border-white/10 max-w-md mx-auto space-y-2">
          <p className="text-base font-bold font-display text-white">No land listings match your selected requirements.</p>
          <span className="text-xs text-cream-200/60 font-body block">
            Try changing your soil type, irrigation source, or search location.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredParcels.map((parcel) => (
            <div
              key={parcel.id}
              className="group p-6 rounded-3xl bg-forest-950/90 border border-white/10 hover:border-amber-400/40 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-amber-950/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Soil Badge, Water Badge, Title Deed Verified */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-400/30 uppercase font-bold flex items-center gap-1">
                      <span>{parcel.soilIcon}</span>
                      <span>{parcel.soilTypeName.split(' ')[0]}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono border border-sky-400/30 flex items-center gap-1">
                      <Waves className="w-3 h-3 text-sky-400" />
                      <span>{parcel.waterSourceName.split(' ')[0]}</span>
                    </span>
                  </div>

                  {parcel.verifiedTitle && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono font-bold">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>1-B Title Verified</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  onClick={() => setSelectedParcel(parcel)}
                  className="text-base sm:text-lg font-bold font-display text-white group-hover:text-amber-300 transition-colors cursor-pointer mb-2"
                >
                  {parcel.title}
                </h3>

                {/* Location & Owner */}
                <div className="flex items-center justify-between text-xs font-mono text-cream-200/70 mb-4">
                  <span className="flex items-center gap-1 truncate max-w-[220px]">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="truncate">{parcel.location}</span>
                  </span>
                  <span className="text-[10px] text-cream-200/50">
                    Owner: {parcel.ownerName.split(' ')[0]}
                  </span>
                </div>

                {/* Key Metrics Strip (Acreage, Rent, Tenure, Soil Score) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3.5 rounded-2xl bg-forest-900/80 border border-white/5 text-xs font-mono mb-4">
                  <div>
                    <span className="text-[9px] text-cream-200/50 block">Parcel Size</span>
                    <span className="text-white font-black text-base block">
                      {parcel.acreage} <span className="text-[10px] font-normal text-cream-200/60">Acres</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-cream-200/50 block">Annual Lease</span>
                    <span className="text-amber-300 font-bold text-sm">
                      ₹{parcel.annualRentPerAcre.toLocaleString()}
                      <span className="text-[9px] font-normal text-cream-200/50 block">/Acre/Yr</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-cream-200/50 block">Soil Health</span>
                    <span className="text-emerald-400 font-bold text-sm flex items-center gap-0.5">
                      <Gauge className="w-3.5 h-3.5" />
                      {parcel.soilHealthScore}/100
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-cream-200/50 block">Tenure</span>
                    <span className="text-sky-300 font-bold text-[11px] block">
                      {parcel.leaseTenure}
                    </span>
                  </div>
                </div>

                {/* Amenities Badges (Road, Electricity, Fencing) */}
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-cream-200/80 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>{parcel.electricity.split(' ')[0]} {parcel.electricity.split(' ')[1]}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-cream-200/80">
                    Road: {parcel.roadAccess.split(' ')[0]}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-emerald-300">
                    Survey: {parcel.surveyNumber.split(',')[0]}
                  </span>
                </div>

                {/* Suitable Crops Tags */}
                <div className="flex flex-wrap items-center gap-1 mb-4">
                  <span className="text-[10px] font-mono text-cream-200/40 mr-1">Recommended:</span>
                  {parcel.suitableCrops.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-forest-900 text-amber-200 text-[10px] font-mono"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                <button
                  onClick={() => setSelectedParcel(parcel)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-forest-900 hover:bg-forest-800 border border-white/10 text-cream-100 font-display font-semibold text-xs transition-colors cursor-pointer text-center"
                >
                  Inspect Parcel
                </button>

                <button
                  onClick={() => {
                    setSelectedParcel(parcel);
                    setIsInquiryModalOpen(true);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display text-xs shadow-md transition-all hover:scale-105 cursor-pointer text-center flex items-center justify-center gap-1"
                >
                  <span>Request Lease</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <FavoriteButton
                  item={{
                    ...parcel,
                    id: parcel.id,
                    title: `${parcel.acreage} Acre — ${parcel.title}`,
                    domain: 'land',
                    domainLabel: 'Land',
                    icon: '🌾',
                    price: parcel.annualRentPerAcre,
                    unit: 'Acre/Yr',
                    summary: `${parcel.district} Dist • ${parcel.soilTypeName}`,
                    targetWorld: 'land',
                  }}
                  size="md"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
