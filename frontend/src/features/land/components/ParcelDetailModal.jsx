import React from 'react';
import { useLand } from '../../../context/LandContext';
import {
  X,
  MapPin,
  Waves,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Gauge,
  FileText,
  DollarSign,
  Star,
} from 'lucide-react';

export const ParcelDetailModal = () => {
  const { selectedParcel, setSelectedParcel, setIsInquiryModalOpen } = useLand();

  if (!selectedParcel) return null;

  const handleInquire = () => {
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
        onClick={() => setSelectedParcel(null)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl p-6 sm:p-8 rounded-3xl bg-forest-950/95 border border-amber-400/40 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-cream-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setSelectedParcel(null)}
          className="absolute right-5 top-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badges Header */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold uppercase flex items-center gap-1">
            <span>{selectedParcel.soilIcon}</span>
            <span>{selectedParcel.soilTypeName}</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-mono flex items-center gap-1">
            <Waves className="w-3.5 h-3.5" />
            <span>{selectedParcel.waterSourceName}</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-stone-950 text-[10px] font-mono font-black flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIED TITLE: 1-B PASSBOOK</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight mb-2">
          {selectedParcel.title}
        </h2>

        {/* Owner & Location Info */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-forest-900/70 border border-white/5 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{selectedParcel.ownerAvatar}</span>
            <div>
              <h4 className="text-xs font-bold font-display text-white">{selectedParcel.ownerName}</h4>
              <span className="text-[10px] font-mono text-cream-200/60 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                {selectedParcel.location} • Survey No: {selectedParcel.surveyNumber}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-amber-400 text-xs font-bold font-mono">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{selectedParcel.rating}</span>
            <span className="text-cream-200/50 text-[10px]">({selectedParcel.reviews} reviews)</span>
          </div>
        </div>

        {/* Financial & Land Core Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-forest-900/90 border border-white/10 text-xs font-mono mb-6">
          <div>
            <span className="text-[10px] text-cream-200/50 block">Acreage</span>
            <span className="text-white font-black text-lg block">{selectedParcel.acreage} Acres</span>
            <span className="text-[10px] text-cream-200/60 block">Contiguous Plot</span>
          </div>
          <div>
            <span className="text-[10px] text-cream-200/50 block">Annual Lease Rent</span>
            <span className="text-amber-300 font-bold text-base">
              ₹{selectedParcel.annualRentPerAcre.toLocaleString()}
            </span>
            <span className="text-[10px] text-cream-200/60 block">per Acre / Year</span>
          </div>
          <div>
            <span className="text-[10px] text-cream-200/50 block">Total Annual Rent</span>
            <span className="text-white font-bold text-base">
              ₹{selectedParcel.totalAnnualRent.toLocaleString()}
            </span>
            <span className="text-[10px] text-cream-200/60 block">Deposit: {selectedParcel.securityDepositMonths} Mos</span>
          </div>
          <div>
            <span className="text-[10px] text-cream-200/50 block">Lease Tenure</span>
            <span className="text-sky-300 font-bold text-sm block">{selectedParcel.leaseTenure}</span>
            <span className="text-[10px] text-emerald-400 block">{selectedParcel.availableFrom}</span>
          </div>
        </div>

        {/* Soil Health Certificate & Nutrient Analysis */}
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-2xl bg-forest-900/60 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold font-mono text-emerald-400 uppercase flex items-center gap-1">
                <Gauge className="w-4 h-4" />
                <span>Certified Soil Chemistry & Fertility Report</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                Health Score: {selectedParcel.soilHealthScore}/100
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[9px] text-cream-200/50 block">Soil pH:</span>
                <span className="text-white font-bold">{selectedParcel.soilReport.pH} (Optimal)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[9px] text-cream-200/50 block">Organic Carbon (OC):</span>
                <span className="text-white font-bold">{selectedParcel.soilReport.organicCarbon}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[9px] text-cream-200/50 block">Available Nitrogen (N):</span>
                <span className="text-emerald-300 font-bold">{selectedParcel.soilReport.nitrogen}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[9px] text-cream-200/50 block">Phosphorus (P2O5):</span>
                <span className="text-emerald-300 font-bold">{selectedParcel.soilReport.phosphorus}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[9px] text-cream-200/50 block">Potassium (K2O):</span>
                <span className="text-emerald-300 font-bold">{selectedParcel.soilReport.potassium}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[9px] text-cream-200/50 block">Electrical Cond. (EC):</span>
                <span className="text-white font-bold">{selectedParcel.soilReport.ec}</span>
              </div>
            </div>
          </div>

          {/* Water & Infrastructure Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-sky-400 font-bold uppercase block mb-1">Water Supply & Source</span>
              <p className="text-[11px] text-cream-200/80">{selectedParcel.waterReport.source}</p>
              <p className="text-[10px] text-emerald-400">{selectedParcel.waterReport.waterQuality} • {selectedParcel.waterReport.availabilityMonths}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-amber-400 font-bold uppercase block mb-1">Infrastructure & Power</span>
              <p className="text-[11px] text-cream-200/80">⚡ Electricity: {selectedParcel.electricity}</p>
              <p className="text-[11px] text-cream-200/80">🛣️ Road Access: {selectedParcel.roadAccess}</p>
              <p className="text-[11px] text-cream-200/80">🛡️ Fencing: {selectedParcel.fencing}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase text-amber-300 mb-1">
              Property Overview & Cultivation Notes
            </h4>
            <p className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs font-body leading-relaxed text-cream-200/90">
              {selectedParcel.description}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={() => setSelectedParcel(null)}
            className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-cream-200/80 text-xs font-mono cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handleInquire}
            className="py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display text-xs shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            Request Lease / Inspection Visit →
          </button>
        </div>
      </div>
    </div>
  );
};
