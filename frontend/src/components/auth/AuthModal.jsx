import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Lock, Mail, User, ShieldCheck, Phone, MapPin, AlertCircle, Loader2 } from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authMode,
    setAuthMode,
    login,
    register,
    authError,
    loading,
  } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'FARMER',
    phoneNumber: '',
    state: 'Andhra Pradesh',
    district: 'Guntur',
  });

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      await login(formData.email, formData.password);
    } else {
      await register(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest-950/85 backdrop-blur-xl"
        onClick={closeAuthModal}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-forest-950/95 border border-emerald-500/40 shadow-2xl z-10 text-cream-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeAuthModal}
          className="absolute right-5 top-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold font-display shadow-md shadow-emerald-950/70 border border-emerald-400/40">
            🌱
          </div>
          <div>
            <span className="font-display font-black text-lg tracking-wider text-white">KṢETRA</span>
            <span className="font-display font-light text-lg tracking-widest text-emerald-400">VYA</span>
          </div>
        </div>

        <h2 className="text-xl font-bold font-display text-white mb-1">
          {authMode === 'login' ? 'Welcome to Kṣetravya' : 'Join Kṣetravya Ecosystem'}
        </h2>
        <p className="text-xs text-cream-200/70 font-body mb-5">
          {authMode === 'login'
            ? 'Your connected agricultural ecosystem.'
            : 'Join farmers, skilled agricultural workers, and agribusiness leaders across the ecosystem.'}
        </p>

        {authError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
          {authMode === 'register' && (
            <div>
              <label className="text-cream-200/70 block mb-1">FULL NAME</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400/50"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-cream-200/70 block mb-1">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="email"
                required
                placeholder="name@farm.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400/50"
              />
            </div>
          </div>

          <div>
            <label className="text-cream-200/70 block mb-1">PASSWORD</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400/50"
              />
            </div>
          </div>

          {authMode === 'register' && (
            <>
              <div>
                <label className="text-cream-200/70 block mb-1">SELECT YOUR ROLE</label>
                <div className="grid grid-cols-2 gap-2">
                  {['FARMER', 'WORKER'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: r })}
                      className={`py-2 rounded-xl border text-[11px] font-bold tracking-wider transition-all ${
                        formData.role === r
                          ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 shadow-md'
                          : 'bg-white/5 border-white/10 text-cream-200/60 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-cream-200/70 block mb-1">PHONE NUMBER</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="tel"
                    placeholder="+91 98480 12345"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-cream-200/70 block mb-1">STATE</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400/50"
                  />
                </div>
                <div>
                  <label className="text-cream-200/70 block mb-1">DISTRICT</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-forest-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400/50"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-display text-xs tracking-wider transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        <div className="mt-5 text-center text-xs font-body text-cream-200/60">
          {authMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setAuthMode('register')}
                className="text-emerald-400 font-bold hover:underline cursor-pointer"
              >
                Register Here
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => setAuthMode('login')}
                className="text-emerald-400 font-bold hover:underline cursor-pointer"
              >
                Sign In Here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
