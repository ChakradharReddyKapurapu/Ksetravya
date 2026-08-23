import React from 'react';
import { useWeather } from '../../../context/WeatherContext';
import { ShieldCheck, Droplets, Tractor, Sprout, Wind, AlertCircle } from 'lucide-react';

export const AgriculturalAdvisorySection = () => {
  const { liveWeatherData } = useWeather();
  if (!liveWeatherData) return null;

  const { current, daily, insights } = liveWeatherData;
  const isRain = current.precipitation > 0 || current.parsedCondition.condition === 'rain' || current.parsedCondition.condition === 'thunderstorm';
  const isWindy = current.windSpeed > 20;

  const advisories = [
    {
      title: 'Pesticide & Foliar Spraying',
      status: isRain ? 'POSTPONE SPRAYING' : isWindy ? 'CAUTION (HIGH WIND)' : 'OPTIMAL CONDITIONS',
      statusColor: isRain ? 'text-rose-400 bg-rose-500/20' : isWindy ? 'text-amber-400 bg-amber-500/20' : 'text-emerald-400 bg-emerald-500/20',
      icon: <Droplets className="w-5 h-5" />,
      desc: isRain
        ? 'Active precipitation causes chemical washoff and soil dilution. Delay spraying until weather clears.'
        : isWindy
        ? `Wind speed at ${current.windSpeed} km/h may cause chemical drift onto neighboring plots.`
        : 'Low wind and moderate humidity create ideal conditions for maximum foliar absorption.',
    },
    {
      title: 'Supplemental Irrigation Scheduling',
      status: isRain ? 'HOLD IRRIGATION' : current.temperature > 34 ? 'INCREASE MICRO-IRRIGATION' : 'NORMAL SCHEDULE',
      statusColor: isRain ? 'text-sky-400 bg-sky-500/20' : current.temperature > 34 ? 'text-amber-400 bg-amber-500/20' : 'text-emerald-400 bg-emerald-500/20',
      icon: <Sprout className="w-5 h-5" />,
      desc: isRain
        ? `Precipitation (${current.precipitation.toFixed(1)}mm) provides adequate root-zone moisture. Switch off borewell motors to save energy.`
        : 'Run drip laterals during early morning or late afternoon to prevent evaporative water loss.',
    },
    {
      title: 'Field Trafficability & Tractor Operations',
      status: isRain ? 'MUDDY / LOW TRAFFICABILITY' : 'FIRM SOIL / GOOD FOR TILLAGE',
      statusColor: isRain ? 'text-rose-400 bg-rose-500/20' : 'text-emerald-400 bg-emerald-500/20',
      icon: <Tractor className="w-5 h-5" />,
      desc: isRain
        ? 'Waterlogged topsoil increases tractor wheel slippage and soil compaction. Postpone heavy mechanical ploughing.'
        : 'Dry firm soil allows high traction for rotavators, cultivators, and seed drills.',
    },
    {
      title: 'Harvest & Intercultural Weeding',
      status: isRain ? 'DELAY HARVEST' : 'FAVORABLE WINDOW',
      statusColor: isRain ? 'text-amber-400 bg-amber-500/20' : 'text-emerald-400 bg-emerald-500/20',
      icon: <ShieldCheck className="w-5 h-5" />,
      desc: isRain
        ? 'Moisture on harvested grains or chilli bolls increases fungal vulnerability. Ensure produce is securely covered.'
        : 'Good sun exposure ensures rapid grain desiccation and effective weed suppression.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase font-bold mb-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Agronomic Decision Support</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Farm Weather Insights & Operation Advisories
            </h3>
          </div>
          <span className="text-[10px] font-mono text-amber-400">
            Rule-Based Indicative Guidelines (Open-Meteo Data)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advisories.map((adv, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-forest-900/70 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-white font-bold font-display text-sm">
                    <span className="p-2 rounded-xl bg-white/5 text-amber-300">{adv.icon}</span>
                    <span>{adv.title}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${adv.statusColor}`}>
                    {adv.status}
                  </span>
                </div>
                <p className="text-xs text-cream-200/80 font-body leading-relaxed mt-2">
                  {adv.desc}
                </p>
              </div>

              <span className="text-[9px] font-mono text-cream-200/40 mt-3 block">
                * Verify with local district Krishi Vigyan Kendra (KVK) advisory
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
