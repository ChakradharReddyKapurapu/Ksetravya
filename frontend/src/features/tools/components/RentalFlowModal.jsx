import React, { useState } from 'react';
import { useTools } from '../../../context/ToolsContext';
import { toolsService } from '../services/toolsService';
import { X, Calendar, MapPin, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const RentalFlowModal = () => {
  const { rentalModalTool, setRentalModalTool } = useTools();

  const [days, setDays] = useState(3);
  const [includeDelivery, setIncludeDelivery] = useState(true);
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [submittedResult, setSubmittedResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!rentalModalTool) return null;

  const rentalSubtotal = rentalModalTool.rentPriceDay * days;
  const deposit = rentalModalTool.deposit;
  const deliveryCharge = includeDelivery ? 1200 : 0;
  const totalEstimate = rentalSubtotal + deposit + deliveryCharge;

  const handleRequestRental = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await toolsService.requestRental({
      toolId: rentalModalTool.id,
      days,
      startDate,
      includeDelivery,
      totalEstimate,
    });
    setLoading(false);
    setSubmittedResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-forest-950/85 backdrop-blur-xl"
        onClick={() => setRentalModalTool(null)}
      />

      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-forest-950/95 border border-sky-500/40 shadow-2xl z-10 text-cream-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setRentalModalTool(null)}
          className="absolute right-5 top-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedResult ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-4 shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-1">
              Rental Booking Request Sent!
            </h3>
            <p className="text-xs text-cream-200/70 font-mono mb-4">
              Booking Ref: {submittedResult.bookingReference} (Demo Submission)
            </p>
            <p className="text-xs text-cream-200/80 font-body mb-6">
              The equipment owner ({rentalModalTool.seller.name}) has been notified. 
              They will contact you at your verified phone number to coordinate machinery dispatch.
            </p>
            <button
              onClick={() => {
                setSubmittedResult(null);
                setRentalModalTool(null);
              }}
              className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-display text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleRequestRental}>
            <div className="text-xs font-mono uppercase text-sky-400 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Machinery Rental Calculator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight mb-1">
              {rentalModalTool.name}
            </h2>
            <p className="text-xs text-cream-200/60 font-mono mb-6">
              Rate: ₹{rentalModalTool.rentPriceDay.toLocaleString()} / day • Location: {rentalModalTool.location}
            </p>

            {/* Inputs: Duration & Start Date */}
            <div className="grid grid-cols-2 gap-3 mb-5 font-mono text-xs">
              <div>
                <label className="text-cream-200/70 block mb-1">RENTAL DURATION</label>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-forest-900 border border-white/10">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={days}
                    onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-transparent text-white font-bold focus:outline-none"
                  />
                  <span className="text-cream-200/50">Days</span>
                </div>
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">START DATE</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 rounded-xl bg-forest-900 border border-white/10 text-white font-bold focus:outline-none"
                />
              </div>
            </div>

            {/* Delivery Option Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-forest-900/60 border border-white/5 mb-5 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-sky-400" />
                <span>Farm Delivery (+₹1,200 transit)</span>
              </div>
              <input
                type="checkbox"
                checked={includeDelivery}
                onChange={(e) => setIncludeDelivery(e.target.checked)}
                className="w-4 h-4 accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Calculation Breakdown */}
            <div className="p-4 rounded-2xl bg-forest-900/80 border border-white/10 space-y-2 font-mono text-xs text-cream-200/80 mb-6">
              <div className="flex justify-between">
                <span className="text-cream-200/60">Machinery Rental ({days} days @ ₹{rentalModalTool.rentPriceDay}/d):</span>
                <span>₹{rentalSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream-200/60">Refundable Security Deposit:</span>
                <span className="text-amber-300">₹{deposit.toLocaleString()}</span>
              </div>
              {includeDelivery && (
                <div className="flex justify-between">
                  <span className="text-cream-200/60">Doorstep Farm Transit:</span>
                  <span>₹{deliveryCharge.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white font-display">
                <span>Total Estimated Cost:</span>
                <span className="text-sky-300">₹{totalEstimate.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-stone-950 font-bold font-display text-xs transition-all shadow-lg cursor-pointer"
            >
              {loading ? 'Submitting Booking Request...' : 'Confirm Rental Booking Request →'}
            </button>
            <span className="text-[10px] text-cream-200/50 font-mono block text-center mt-2">
              Demo Request • No payment is processed at this stage
            </span>
          </form>
        )}
      </div>
    </div>
  );
};
