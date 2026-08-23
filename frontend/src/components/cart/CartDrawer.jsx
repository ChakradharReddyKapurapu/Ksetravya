import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, X, Plus, Minus, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    checkoutSuccess,
    setCheckoutSuccess,
  } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutSuccess(true);
      clearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsCartOpen(false);
          setCheckoutSuccess(false);
        }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-forest-950/95 border-l border-white/10 text-cream-100 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white">Your Agricultural Cart</h3>
                <span className="text-[10px] font-mono text-emerald-400">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} ready for farm dispatch
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setCheckoutSuccess(false);
              }}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {checkoutSuccess ? (
              <div className="text-center py-12 px-4 space-y-3 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold font-display text-white">Order Submitted!</h4>
                <p className="text-xs text-cream-200/70 font-body">
                  Your seed & crop-care requisition has been sent to verified local distributors. (Demo Order)
                </p>
                <button
                  onClick={() => {
                    setCheckoutSuccess(false);
                    setIsCartOpen(false);
                  }}
                  className="mt-4 px-6 py-2 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs"
                >
                  Continue Browsing
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-2">
                <ShoppingBag className="w-12 h-12 text-cream-200/20 mx-auto mb-2" />
                <h4 className="text-sm font-bold font-display text-white">Your cart is empty</h4>
                <p className="text-xs text-cream-200/50 font-body">
                  Explore Seeds, Crop Protection, and Tools to add agricultural supplies.
                </p>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemPrice = item.price || item.buyPrice || item.rentPriceDay || 0;
                return (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 rounded-2xl bg-forest-900/80 border border-white/10 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs">{item.icon || '🌱'}</span>
                        <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold truncate">
                          {item.brand || item.crop || 'AGRI NEXUS'}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold font-display text-white truncate">
                        {item.name || item.variety}
                      </h5>
                      <span className="text-[10px] font-mono text-cream-200/60 block">
                        {item.packSize || item.category} • ₹{itemPrice.toLocaleString()} each
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 bg-forest-950 p-1 rounded-xl border border-white/10">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="p-1 rounded-lg hover:bg-white/10 text-cream-200/70"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold px-1 text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="p-1 rounded-lg hover:bg-white/10 text-cream-200/70"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="p-1.5 text-cream-200/40 hover:text-rose-400 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {!checkoutSuccess && cartItems.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-forest-950/90 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cream-200/70">Subtotal</span>
                <span className="text-white font-bold text-sm">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-cream-200/50">
                <span>Estimated Doorstep Freight</span>
                <span className="text-emerald-400">FREE on Demo Orders</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between font-display">
                <span className="text-sm font-bold text-white">Total Amount</span>
                <span className="text-lg font-black text-amber-400">₹{cartTotal.toLocaleString()}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing Demo Requisition...</span>
                ) : (
                  <>
                    <span>Proceed to Agricultural Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-[9px] text-center font-mono text-cream-200/40">
                Demo Data • No payment card charged
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
