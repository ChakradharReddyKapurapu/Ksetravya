import React, { useState, useEffect } from 'react';
import { CreditCard, ArrowDownRight, ArrowUpRight, Clock, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export function TransactionHistory({ role = 'FARMER' }) {
  const [transactions, setTransactions] = useState([]);
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [role]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (role === 'WORKER') {
        const res = await fetch('/api/worker/earnings', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setEarnings(data.data);
          setTransactions(data.data.recentEarningsTransactions || []);
        } else {
          throw new Error(data.message || 'Failed to fetch earnings');
        }
      } else {
        const res = await fetch('/api/payments/my?page=0&size=10', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setTransactions(data.data.content || []);
        } else {
          throw new Error(data.message || 'Failed to fetch transaction history');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SUCCESS':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Paid
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3 h-3" /> Failed
          </span>
        );
      case 'REFUNDED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <RefreshCw className="w-3 h-3" /> Refunded
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-400 border border-gray-500/30">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-2xl p-6 text-emerald-100 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
            <CreditCard className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-emerald-50">
              {role === 'WORKER' ? '💰 Worker Earnings' : '💳 Transaction History'}
            </h3>
            <p className="text-xs text-emerald-400/80">Authoritative payment ledger</p>
          </div>
        </div>

        <button
          onClick={fetchData}
          className="p-2 bg-emerald-900/40 hover:bg-emerald-800/40 border border-emerald-500/30 rounded-xl text-emerald-400 hover:text-emerald-200 transition"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Summary Cards for Worker */}
      {role === 'WORKER' && earnings && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-xl p-4">
            <p className="text-xs text-emerald-400/80">Total Earned</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">₹{earnings.totalEarned}</p>
          </div>
          <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-xl p-4">
            <p className="text-xs text-emerald-400/80">Pending Earnings</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">₹{earnings.pendingEarnings}</p>
          </div>
          <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-xl p-4">
            <p className="text-xs text-emerald-400/80">Jobs Paid</p>
            <p className="text-2xl font-bold text-emerald-100 mt-1">{earnings.completedJobsPaidCount}</p>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="py-12 text-center text-xs text-emerald-400/70">
          <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading transactions...
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs text-rose-200">
          {error}
        </div>
      ) : transactions.length === 0 ? (
        <div className="py-12 text-center text-xs text-emerald-400/60 bg-emerald-900/20 rounded-xl border border-emerald-500/10">
          No payment transactions found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-emerald-500/20 text-emerald-400/80">
                <th className="pb-3 font-semibold">Job Title</th>
                <th className="pb-3 font-semibold">{role === 'WORKER' ? 'Farmer' : 'Worker'}</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {transactions.map((tx) => (
                <tr key={tx.transactionId} className="hover:bg-emerald-900/20 transition">
                  <td className="py-3.5 font-medium text-emerald-100">{tx.jobTitle}</td>
                  <td className="py-3.5 text-emerald-300">{role === 'WORKER' ? tx.payerName : tx.payeeName}</td>
                  <td className="py-3.5 font-bold text-emerald-400">
                    ₹{role === 'WORKER' ? tx.netWorkerAmount : tx.amount} {tx.currency}
                  </td>
                  <td className="py-3.5 text-emerald-400/70">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 text-right">{getStatusBadge(tx.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
