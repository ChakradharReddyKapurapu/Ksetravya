import React, { useState, useEffect, useRef } from 'react';
import { useSearch } from '../../context/SearchContext';
import { useWorld } from '../../context/WorldContext';
import { searchService, DOMAIN_META, QUICK_SUGGESTIONS } from '../../services/searchService';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, AlertCircle, Command } from 'lucide-react';

const CATEGORY_TABS = [
  { id: 'all', label: 'All' },
  { id: 'tools', label: 'Tools', icon: '🚜' },
  { id: 'seeds', label: 'Seeds', icon: '🌱' },
  { id: 'crop_protection', label: 'Crop Care', icon: '🛡️' },
  { id: 'prices', label: 'Prices', icon: '📈' },
  { id: 'marketplace', label: 'Market', icon: '🛒' },
  { id: 'jobs', label: 'Jobs', icon: '💼' },
  { id: 'land', label: 'Land', icon: '🌾' },
  { id: 'analytics', label: 'Intel', icon: '📊' },
];

export const GlobalSearchModal = () => {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery, activeCategory, setActiveCategory } =
    useSearch();

  const {
    startTransitionToFarm,
    startTransitionToTools,
    startTransitionToSeeds,
    startTransitionToCropProtection,
    startTransitionToMarket,
    startTransitionToJobs,
    startTransitionToLand,
    startTransitionToWeather,
    startTransitionToAnalytics,
  } = useWorld();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Execute Search
  useEffect(() => {
    let isMounted = true;
    if (!searchQuery.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    searchService.search(searchQuery, activeCategory).then((data) => {
      if (isMounted) {
        setResults(data);
        setLoading(false);
        setSelectedIndex(0);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [searchQuery, activeCategory]);

  // Handle Result Navigation
  const handleSelectResult = (item) => {
    closeSearch();
    setSearchQuery('');

    switch (item.targetWorld) {
      case 'tools':
        startTransitionToTools();
        break;
      case 'seeds':
        startTransitionToSeeds();
        break;
      case 'crop_protection':
        startTransitionToCropProtection();
        break;
      case 'market':
        startTransitionToMarket();
        break;
      case 'jobs':
        startTransitionToJobs();
        break;
      case 'land':
        startTransitionToLand();
        break;
      case 'weather':
        startTransitionToWeather();
        break;
      case 'analytics':
        startTransitionToAnalytics();
        break;
      default:
        startTransitionToFarm();
    }
  };

  // Keyboard navigation inside list
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelectResult(results[selectedIndex]);
      }
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div
        onClick={closeSearch}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-150"
      />

      {/* Search Command Palette Card */}
      <div
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-2xl bg-forest-950/95 border border-emerald-500/40 rounded-3xl shadow-2xl backdrop-blur-2xl text-cream-100 overflow-hidden z-10 animate-in zoom-in-95 duration-150 flex flex-col max-h-[80vh]"
      >
        {/* Top Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools, crops, products, jobs, land and more..."
            className="w-full bg-transparent border-none text-sm sm:text-base text-white placeholder:text-cream-200/40 focus:outline-none font-body"
          />

          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full hover:bg-white/10 text-cream-200/60 hover:text-white transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-cream-200/60">
              ESC
            </kbd>
          )}

          <button
            onClick={closeSearch}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white transition-colors cursor-pointer ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 px-5 py-2.5 bg-forest-900/60 border-b border-white/5 overflow-x-auto scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-display font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-emerald-500 text-stone-950 shadow-md font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white'
                }`}
              >
                {tab.icon && <span>{tab.icon}</span>}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results / Suggestions Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[50vh] scrollbar-none">
          {loading ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-7 h-7 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mx-auto" />
              <p className="text-xs font-mono text-emerald-300">Searching across AGRI NEXUS ecosystem...</p>
            </div>
          ) : searchQuery.trim().length === 0 ? (
            /* Empty State: Quick Suggestions */
            <div className="py-4 px-2 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider">Popular Searches</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {QUICK_SUGGESTIONS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setSearchQuery(item.query);
                      setActiveCategory('all');
                    }}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-left transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{DOMAIN_META[item.domain]?.icon}</span>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors">
                          {item.label}
                        </div>
                        <span className="text-[10px] text-cream-200/50 font-mono">
                          in {DOMAIN_META[item.domain]?.label}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-cream-200/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            /* No Results Found State */
            <div className="py-12 text-center space-y-2 max-w-sm mx-auto">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cream-200/50 mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-display text-white">No results found matching "{searchQuery}"</h4>
              <p className="text-xs text-cream-200/60 font-body">
                Try searching for broader terms like "tractor", "rice", "tomato", "harvesting", or "land".
              </p>
            </div>
          ) : (
            /* Results List */
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-2 pb-1 text-[10px] font-mono text-cream-200/50 uppercase tracking-wider">
                <span>{results.length} Matches Found</span>
                <span>Select to navigate</span>
              </div>

              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const meta = DOMAIN_META[item.domain] || {};

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectResult(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-400/60 text-white shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 border-white/5 text-cream-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-forest-900 border border-white/10 flex items-center justify-center text-lg flex-shrink-0">
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-display truncate text-white">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.2 rounded-full bg-white/10 text-cream-200 text-[9px] font-mono whitespace-nowrap">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-cream-200/60 font-body truncate mt-0.5">
                          {item.snippet}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="px-2.5 py-1 rounded-full bg-forest-900/80 border border-white/10 text-emerald-300 text-[10px] font-mono font-semibold">
                        {item.domainLabel}
                      </span>
                      {isSelected && (
                        <CornerDownLeft className="w-4 h-4 text-emerald-400 hidden sm:block animate-pulse" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="px-5 py-2.5 bg-forest-950 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-cream-200/50">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">↑↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">↵</kbd> to select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">ESC</kbd> to close
            </span>
          </div>

          <span className="text-[10px] text-emerald-400/80">
            AGRI NEXUS Discovery Layer
          </span>
        </div>
      </div>
    </div>
  );
};
