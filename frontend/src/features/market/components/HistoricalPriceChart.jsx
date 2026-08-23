import React, { useState } from 'react';
import { useWorld } from '../../../context/WorldContext';
import { X, Calendar, TrendingUp, Info, BarChart3, LineChart } from 'lucide-react';

export const HistoricalPriceChart = () => {
  const { historyModalCrop, setHistoryModalCrop } = useWorld();
  const [activeYearIndex, setActiveYearIndex] = useState(4); // 2026 default
  const [chartType, setChartType] = useState('line'); // 'line' | 'bar'

  if (!historyModalCrop) return null;

  const historyData = historyModalCrop.history || [];
  const selectedYearData = historyData[activeYearIndex] || historyData[historyData.length - 1];

  // SVG dimensions for 2D Chart
  const svgWidth = 520;
  const svgHeight = 220;
  const padding = 40;

  // Calculate scales
  const minVal = Math.min(...historyData.map((d) => d.min)) * 0.9;
  const maxVal = Math.max(...historyData.map((d) => d.max)) * 1.1;

  const getX = (index) => padding + (index * (svgWidth - 2 * padding)) / (historyData.length - 1);
  const getY = (val) => svgHeight - padding - ((val - minVal) / (maxVal - minVal || 1)) * (svgHeight - 2 * padding);

  // Generate SVG Path for line
  const linePoints = historyData.map((d, i) => `${getX(i)},${getY(d.price)}`).join(' ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest-950/85 backdrop-blur-xl transition-opacity"
        onClick={() => setHistoryModalCrop(null)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-forest-950/95 border border-amber-400/50 shadow-2xl z-10 text-cream-100 animate-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={() => setHistoryModalCrop(null)}
          className="absolute right-5 top-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Badge */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 mb-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>2022 → 2026 Historical Price Analysis</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
          {historyModalCrop.name}
        </h2>
        <span className="text-xs text-amber-300 font-mono">
          Historical Demo Data • APMC Mandi Index
        </span>

        {/* Chart Type Toggle & Selected Year Metric Pill */}
        <div className="flex items-center justify-between my-5">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-forest-900 border border-white/10">
            <button
              onClick={() => setChartType('line')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                chartType === 'line' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-cream-200/70 hover:text-white'
              }`}
            >
              <LineChart className="w-3.5 h-3.5" />
              <span>Trend Line</span>
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                chartType === 'bar' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-cream-200/70 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Yearly Bars</span>
            </button>
          </div>

          <div className="flex items-baseline gap-2 font-mono text-sm">
            <span className="text-cream-200/60 uppercase text-xs">{selectedYearData.year} Rate:</span>
            <span className="text-lg font-bold text-amber-400">
              ₹{selectedYearData.price.toLocaleString()} / {historyModalCrop.unit}
            </span>
          </div>
        </div>

        {/* 2D SVG Chart */}
        <div className="p-4 rounded-2xl bg-forest-900/70 border border-white/10 overflow-x-auto">
          <svg className="w-full h-56" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
            {/* Grid lines */}
            {[0, 0.33, 0.66, 1].map((pct, i) => {
              const y = padding + pct * (svgHeight - 2 * padding);
              return (
                <line
                  key={i}
                  x1={padding}
                  y1={y}
                  x2={svgWidth - padding}
                  y2={y}
                  stroke="rgba(255,255,255,0.08)"
                  strokeDasharray="4 4"
                />
              );
            })}

            {chartType === 'line' ? (
              <>
                {/* Area Fill */}
                <polygon
                  points={`${getX(0)},${svgHeight - padding} ${linePoints} ${getX(
                    historyData.length - 1
                  )},${svgHeight - padding}`}
                  fill="rgba(245, 158, 11, 0.15)"
                />
                {/* Main Trend Line */}
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={linePoints}
                />
              </>
            ) : (
              /* Bar Chart Representation */
              historyData.map((d, idx) => {
                const x = getX(idx) - 18;
                const y = getY(d.price);
                const height = svgHeight - padding - y;
                const isSelected = activeYearIndex === idx;
                return (
                  <rect
                    key={idx}
                    x={x}
                    y={y}
                    width="36"
                    height={height}
                    rx="6"
                    fill={isSelected ? '#f59e0b' : 'rgba(245, 158, 11, 0.45)'}
                    className="transition-all duration-200 cursor-pointer"
                    onClick={() => setActiveYearIndex(idx)}
                  />
                );
              })
            )}

            {/* Data Points */}
            {historyData.map((d, idx) => {
              const isSelected = activeYearIndex === idx;
              return (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onClick={() => setActiveYearIndex(idx)}
                >
                  <circle
                    cx={getX(idx)}
                    cy={getY(d.price)}
                    r={isSelected ? 6.5 : 4.5}
                    fill={isSelected ? '#ffffff' : '#f59e0b'}
                    stroke="#0a2318"
                    strokeWidth="2.5"
                  />
                  {/* Year Label */}
                  <text
                    x={getX(idx)}
                    y={svgHeight - 12}
                    textAnchor="middle"
                    fill={isSelected ? '#fbbf24' : 'rgba(255,255,255,0.6)'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                  >
                    {d.year}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Year Breakdown Table */}
        <div className="grid grid-cols-4 gap-2.5 mt-4 text-center font-mono text-xs">
          <div className="p-2.5 rounded-xl bg-white/5">
            <span className="text-[10px] text-cream-200/50 block">YEAR</span>
            <span className="text-sm font-bold text-white mt-0.5 block">{selectedYearData.year}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5">
            <span className="text-[10px] text-cream-200/50 block">MIN PRICE</span>
            <span className="text-sm font-bold text-white mt-0.5 block">₹{selectedYearData.min}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30">
            <span className="text-[10px] text-amber-300 block font-bold">AVG RATE</span>
            <span className="text-sm font-bold text-amber-300 mt-0.5 block">₹{selectedYearData.avg}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5">
            <span className="text-[10px] text-cream-200/50 block">MAX PRICE</span>
            <span className="text-sm font-bold text-white mt-0.5 block">₹{selectedYearData.max}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
