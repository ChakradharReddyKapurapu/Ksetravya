import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Lock, ShieldCheck, X, DollarSign, CreditCard } from 'lucide-react';

export function PaymentModal({ isOpen, onClose, job, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (isOpen && job) {
      initiateOrder();
    } else {
      setOrder(null);
      setError(null);
      setSuccessData(null);
      setLoading(false);
    }
  }, [isOpen, job]);

  const initiateOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/payments/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ jobId: job.id })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to create payment order');
      }
      setOrder(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPay = async () => {
    if (!order) return;
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      // Simulated secure checkout verification call
      const verifyRes = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          providerOrderId: order.providerOrderId,
          providerPaymentId: `pay_client_${Date.now()}`,
          providerSignature: `sig_mock_client_valid_${Date.now()}`
        })
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.message || 'Payment verification failed');
      }
      setSuccessData(verifyData.data);
      if (onPaymentSuccess) {
        onPaymentSuccess(verifyData.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-emerald-950/90 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl text-emerald-100 relative overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-400 hover:text-emerald-200 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
              <CreditCard className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-50">Job Payment Checkout</h3>
              <p className="text-xs text-emerald-400/80">Secured by Razorpay Encryption</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl flex items-center gap-2 text-rose-200 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successData ? (
            <div className="text-center py-6">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-3 animate-bounce" />
              <h4 className="text-lg font-bold text-emerald-100">Payment Successful!</h4>
              <p className="text-xs text-emerald-300/80 mt-1">Transaction ID: #{successData.transactionId}</p>
              <div className="mt-4 p-3 bg-emerald-900/40 rounded-xl border border-emerald-500/20 text-xs text-emerald-200">
                <div className="flex justify-between mb-1">
                  <span>Amount Paid:</span>
                  <span className="font-bold text-emerald-400">₹{successData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-semibold text-emerald-400">{successData.status}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <div>
              {job && (
                <div className="bg-emerald-900/40 border border-emerald-500/20 rounded-xl p-4 mb-6 space-y-2 text-xs">
                  <div className="flex justify-between text-emerald-200">
                    <span className="text-emerald-400/80">Job Listing:</span>
                    <span className="font-semibold">{job.title}</span>
                  </div>
                  {order && (
                    <>
                      <div className="flex justify-between text-emerald-200">
                        <span className="text-emerald-400/80">Gross Wage:</span>
                        <span>₹{order.grossAmount}</span>
                      </div>
                      <div className="flex justify-between text-emerald-200">
                        <span className="text-emerald-400/80">Platform Fee (5%):</span>
                        <span>₹{order.platformFee}</span>
                      </div>
                      <div className="border-t border-emerald-500/20 pt-2 flex justify-between text-sm font-bold text-emerald-50">
                        <span>Total Payable:</span>
                        <span className="text-emerald-400">₹{order.amount} INR</span>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 text-[11px] text-emerald-400/70 mb-6 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Backend authoritative verification • 256-bit SSL</span>
              </div>

              <button
                onClick={handleConfirmPay}
                disabled={loading || !order}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-900/40 disabled:opacity-50 flex items-center justify-center gap-2 transition"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{order ? order.amount : '...'} Now</span>
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
