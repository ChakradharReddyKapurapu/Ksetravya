import React from 'react';
import { useFarmContext } from '../../../context/FarmContext';
import { Sprout, MapPin, Waves, Droplets, Layers, Calendar, Edit3 } from 'lucide-react';

export const FarmOverviewWidget = () => {
  const { farm, openMyFarmModal } = useFarmContext();

  const overviewItems = [
    {
      label: 'Cultivated Area',
      value: `${farm.landArea} ${farm.areaUnit}`,
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      sub: 'Holding Boundary',
    },
    {
      label: 'Primary Crop',
      value: farm.currentCrop,
      icon: <Sprout className="w-4 h-4 text-amber-400" />,
      sub: farm.season,
    },
    {
      label: 'Soil Classification',
      value: farm.soilType,
      icon: <span className="text-sm">🟤</span>,
      sub: 'Optimal pH 6.8',
    },
    {
      label: 'Water Source',
      value: farm.waterAvailability,
      icon: <Waves className="w-4 h-4 text-sky-400" />,
      sub: 'Hydrological Source',
    },
    {
      label: 'Irrigation Setup',
      value: farm.irrigationType,
      icon: <Droplets className="w-4 h-4 text-teal-400" />,
      sub: 'Direct Root Zone',
    },
    {
      label: 'Location & Region',
      value: `${farm.district}, ${farm.state}`,
      icon: <MapPin className="w-4 h-4 text-rose-400" />,
      sub: farm.pincode ? `PIN: ${farm.pincode}` : 'Andhra Pradesh',
    },
  ];

  return (
    <div className="p-6 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <Sprout className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold font-display text-white text-sm">Farm Overview</h3>
            <span className="text-[10px] text-cream-200/50 font-mono">Centralized Agricultural Profile</span>
          </div>
        </div>

        <button
          onClick={openMyFarmModal}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono"
          title="Edit Farm Parameters"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Edit</span>
        </button>
      </div>

      {/* Grid of 6 Farm Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {overviewItems.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-forest-900/60 border border-white/5 space-y-1 hover:border-emerald-500/30 transition-colors"
          >
            <div className="flex items-center justify-between text-cream-200/50 text-[10px] font-mono">
              <span>{item.label}</span>
              {item.icon}
            </div>
            <div className="font-bold font-display text-white text-sm truncate">
              {item.value}
            </div>
            <div className="text-[10px] text-emerald-400/80 font-mono truncate">
              {item.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
