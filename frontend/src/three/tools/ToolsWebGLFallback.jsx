import React from 'react';
import { Tractor, Wrench } from 'lucide-react';

export const ToolsWebGLFallback = () => {
  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden bg-gradient-to-b from-[#111827] via-[#064e3b] to-[#041f18] flex items-center justify-center select-none">
      <div className="text-center p-8">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-4 shadow-xl">
          <Tractor className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold font-display text-white">
          Agricultural Machinery Marketplace
        </h3>
        <p className="text-xs text-cream-200/60 font-mono mt-1">
          2D Vector Mode Active
        </p>
      </div>
    </div>
  );
};
