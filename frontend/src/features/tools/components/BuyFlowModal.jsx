import React, { useState } from 'react';
import { useTools } from '../../../context/ToolsContext';
import { toolsService } from '../services/toolsService';
import { X, CheckCircle2, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';

export const BuyFlowModal = () => {
  const { buyModalTool, setBuyModalTool } = useTools();

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('Farm Survey #42, Chandragiri, Tirupati Dist, Andhra Pradesh');
  const [submittedResult, setSubmittedResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!buyModalTool) return null;

  const itemTotal = buyModalTool.buyPrice * quantity;
  const transitEstimate = 3500;
  const grandTotal = itemTotal + transitEstimate;

  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await toolsService.submitPurchase({
      toolId: buyModalTool.id,
      quantity,
      address,
      grandTotal,
    });
    setLoading(false);
    setSubmittedResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-forest-950/85 backdrop-blur-xl"
        onClick={() => setBuyModalTool(null)}
      />

      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-forest-950/95 border border-amber-500/40 shadow-2xl z-10 text-cream-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setBuyModalTool(null)}
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
              Purchase Inquiry Submitted!
            </h3>
            <p className="text-xs text-cream-200/70 font-mono mb-4">
              Order Ref: {submittedResult.orderReference} (Demo Submission)
            </p>
            <p className="text-xs text-cream-200/80 font-body mb-6">
              Verified dealer ({buyModalTool.seller.name}) has received your commercial purchase inquiry and proforma invoice request.
            </p>
            <button
              onClick={() => {
                setSubmittedResult(null);
                setBuyModalTool(null);
              }}
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handlePurchase}>
            <div className="text-xs font-mono uppercase text-amber-400 mb-1 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Commercial Machinery Purchase</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight mb-1">
              {buyModalTool.name}
            </h2>
            <p className="text-xs text-cream-200/60 font-mono mb-6">
              Dealer: {buyModalTool.seller.name} • Location: {buyModalTool.location}
            </p>

            {/* Inputs: Quantity & Delivery Address */}
            <div className="space-y-4 mb-6 font-mono text-xs">
              <div>
                <label className="text-cream-200/70 block mb-1">QUANTITY</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2.5 rounded-xl bg-forest-900 border border-white/10 text-white font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">DELIVERY / FARM ADDRESS</label>
                <textarea
                  rows="2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-forest-900 border border-white/10 text-white text-xs focus:outline-none font-body"
                />
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-2xl bg-forest-900/80 border border-white/10 space-y-2 font-mono text-xs text-cream-200/80 mb-6">
              <div className="flex justify-between">
                <span className="text-cream-200/60">Machinery Outright Price ({quantity} unit):</span>
                <span>₹{itemTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream-200/60">Heavy Machinery Flatbed Transit:</span>
                <span>₹{transitEstimate.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white font-display">
                <span>Total Amount:</span>
                <span className="text-amber-300">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-display text-xs transition-all shadow-lg cursor-pointer"
            >
              {loading ? 'Submitting Order...' : 'Submit Commercial Purchase Order →'}
            </button>
            <span className="text-[10px] text-cream-200/50 font-mono block text-center mt-2">
              Demo Checkout • No payment processing is executed
            </span>
          </form>
        )}
      </div>
    </div>
  );
};
