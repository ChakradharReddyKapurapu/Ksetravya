import React, { useState } from 'react';
import { useLand } from '../../../context/LandContext';
import { X, CheckCircle2, MapPin, Calendar, Phone, Info, ShieldCheck } from 'lucide-react';

export const LeaseInquiryModal = () => {
  const { selectedParcel, isInquiryModalOpen, setIsInquiryModalOpen, submitLeaseInquiry } = useLand();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    proposedCrop: 'Cotton & Chilli Dual Crop',
    preferredTenure: '3 Years Commercial Lease',
    message: '',
  });

  if (!isInquiryModalOpen || !selectedParcel) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLeaseInquiry(selectedParcel, formData);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsInquiryModalOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={handleClose} className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity" />

      <div className="relative w-full max-w-lg bg-forest-950/95 border border-amber-400/40 text-cream-100 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">Farmland Lease Inquiry</h3>
              <span className="text-[10px] font-mono text-amber-400 truncate max-w-xs block">
                {selectedParcel.acreage} Acres • {selectedParcel.location.split(',')[0]}
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="text-center py-8 px-4 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold font-display text-white">Lease Inquiry Submitted!</h4>
            <div className="p-3 rounded-2xl bg-forest-900/80 border border-white/10 text-xs font-mono text-cream-200/80 text-left space-y-1">
              <div className="flex justify-between">
                <span>Parcel:</span>
                <span className="text-white font-bold">{selectedParcel.title.split('with')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>Annual Rent:</span>
                <span className="text-amber-300 font-bold">₹{selectedParcel.annualRentPerAcre.toLocaleString()} / Acre</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  INQUIRY SENT & LOGGED
                </span>
              </div>
            </div>
            <p className="text-xs text-cream-200/60 font-body">
              Your contact request and proposed crop plan have been delivered to <strong>{selectedParcel.ownerName}</strong>. An inspection schedule will be sent via SMS.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs cursor-pointer shadow-lg"
            >
              Back to Land Listings
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-3.5 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-cream-200/70 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Venkat Reddy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98480 •••••"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-cream-200/70 block mb-1">Proposed Crop Plan *</label>
                <input
                  type="text"
                  required
                  value={formData.proposedCrop}
                  onChange={(e) => setFormData({ ...formData, proposedCrop: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">Preferred Lease Tenure *</label>
                <select
                  value={formData.preferredTenure}
                  onChange={(e) => setFormData({ ...formData, preferredTenure: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="1 Year Cash Lease">1 Year Cash Lease</option>
                  <option value="2-3 Years Commercial Lease">2-3 Years Commercial Lease</option>
                  <option value="5 Years Long-Term Agreement">5 Years Long-Term Agreement</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-cream-200/70 block mb-1">Inspection Notes & Timing Preference</label>
              <textarea
                rows="2"
                placeholder="Looking to schedule physical soil inspection on coming weekend..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-amber-400 text-xs"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-[10px] text-amber-300 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Direct landowner connection — standard AGRI NEXUS lease templates provided upon title sign-off.</span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-cream-200/80 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display cursor-pointer shadow-lg"
              >
                Submit Lease Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
