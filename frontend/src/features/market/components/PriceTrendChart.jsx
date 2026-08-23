import React, { useState } from 'react';
import { useMarket } from '../../../context/MarketContext';
import { Sparkles, Info } from 'lucide-react';

export const PriceTrendChart = () => {
  const { allCrops } = useMarket();
  const [selectedChartCrops, setSelectedChartCrops] = useState(['rice', 'wheat', 'maize']);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const availableCrops = allCrops.slice(0, 8);

  const toggleCrop = (cropId) => {
    if (selectedChartCrops.includes(cropId)) {
      if (selectedChartCrops.length > 1) {
        setSelectedChartCrops(selectedChartCrops.filter((id) => id !== cropId));
      }
    } else {
      if (selectedChartCrops.length < 4) {
        setSelectedChartCrops([...selectedChartCrops, cropId]);
      }
    }
  };

  const years = [2022, 2023, 2024, 2025, 2026];
  const chartHeight = 160;
  const chartWidth = 320;
  const padding = 25;

  // Find maximum price across selected crops for scaling
  const maxVal = Math.max(
    80,
    ...selectedChartCrops.flatMap((cid) => {
      const c = allCrops.find((item) => item.id === cid);
      return c ? c.history.map((h) => h.price) : [50];
    })
  );

  const getY = (val) => {
    return chartHeight - padding - (val / maxVal) * (chartHeight - padding * 2);
  };

  const getX = (idx) => {
    return padding + (idx / (years.length - 1)) * (chartWidth - padding * 2);
  };

  const colorMap = {
    rice: '#f59e0b',
    wheat: '#22c55e',
    maize: '#38bdf8',
    groundnut: '#fb923c',
    tomato: '#ef4444',
    chilli: '#f43f5e',
    cotton: '#e2e8f0',
    onion: '#d946ef',
  };

  return (
    <div className="p-5 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold font-display uppercase tracking-wider text-white">
              PRICE TREND
            </span>
            <span className="text-[9px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">
              DEMO DATA
            </span>
          </div>
        </div>

        {/* Legend Crop Selectors */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {availableCrops.slice(0, 6).map((c) => {
            const isSelected = selectedChartCrops.includes(c.id);
            const color = colorMap[c.id] || '#4ade80';

            return (
              <button
                key={c.id}
                onClick={() => toggleCrop(c.id)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'bg-white/5 text-cream-200/40 hover:text-white border border-transparent'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span>{c.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* 2D Responsive SVG Multi-Line Chart */}
        <div className="relative w-full h-44 flex items-center justify-center">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full">
            {/* Grid Horizontal Lines & Y-axis labels */}
            {[0, 20, 40, 60, 80].map((v) => {
              const y = getY(v);
              return (
                <g key={v}>
                  <line
                    x1={padding}
                    y1={y}
                    x2={chartWidth - padding}
                    y2={y}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={padding - 5}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[8px] fill-cream-200/40 font-mono"
                  >
                    {v}
                  </text>
                </g>
              );
            })}

            {/* X-axis Year labels */}
            {years.map((yr, idx) => {
              const x = getX(idx);
              return (
                <text
                  key={yr}
                  x={x}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  className="text-[8px] fill-cream-200/50 font-mono"
                >
                  {yr}
                </text>
              );
            })}

            {/* Render Multi-Line Curves */}
            {selectedChartCrops.map((cid) => {
              const crop = allCrops.find((c) => c.id === cid);
              if (!crop) return null;
              const color = colorMap[cid] || '#4ade80';

              const points = crop.history.map((h, i) => `${getX(i)},${getY(h.price)}`).join(' ');

              return (
                <g key={cid}>
                  <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                  {crop.history.map((h, i) => (
                    <circle
                      key={i}
                      cx={getX(i)}
                      cy={getY(h.price)}
                      r="3"
                      fill={color}
                      className="cursor-pointer hover:r-5 transition-all"
                      onMouseEnter={() =>
                        setHoveredPoint({
                          crop: crop.name,
                          year: h.year,
                          price: h.price,
                          color,
                        })
                      }
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  ))}
                </g>
              );
            })}
          </svg>

          {/* Hover Tooltip */}
          {hoveredPoint && (
            <div className="absolute top-2 right-2 px-2.5 py-1 rounded-xl bg-black/90 border border-white/20 text-[10px] font-mono shadow-xl animate-in fade-in">
              <span style={{ color: hoveredPoint.color }} className="font-bold">
                {hoveredPoint.crop}:
              </span>{' '}
              <span className="text-white">
                ₹{hoveredPoint.price}/kg ({hoveredPoint.year})
              </span>
            </div>
          )}
        </div>
      </div>

      <span className="text-[9px] font-mono text-cream-200/40 text-center block pt-2 border-t border-white/5">
        5-Year Mandi Price Trend Analytics (₹/KG)
      </span>
    </div>
  );
};
