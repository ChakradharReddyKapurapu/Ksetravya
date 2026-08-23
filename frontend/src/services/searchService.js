/**
 * AGRI NEXUS — GLOBAL UNIFIED SEARCH SERVICE
 * ==============================================================================
 * Central discovery layer across all AGRI NEXUS domains:
 * - 🚜 Tools & Machinery (tools)
 * - 🌱 Seeds & Germination (seeds)
 * - 🛡️ Crop Protection & Pesticides (crop_protection)
 * - 📈 Mandi Market Prices (market)
 * - 🛒 Marketplace Buy & Sell Goods (market)
 * - 💼 Jobs & Agricultural Work (jobs)
 * - 🌾 Farmland Lease & Property (land)
 * - 🌦️ Weather & Live Atmosphere (weather)
 * - 📊 Agricultural Analytics & AI Intel (analytics)
 *
 * BACKEND INTEGRATION ARCHITECTURE (SPRING BOOT REST API READY):
 * ------------------------------------------------------------------------------
 * Endpoint Contract:
 * GET /api/v1/search?q={query}&category={category}&page={page}&size={size}
 *
 * Response Payload:
 * {
 *   "query": "tractor",
 *   "totalCount": 6,
 *   "results": [
 *     { "id": "...", "title": "...", "snippet": "...", "domain": "tools", ... }
 *   ]
 * }
 * ==============================================================================
 */

import { TOOLS_DATA } from '../features/tools/data/demoToolsData';
import { SEEDS_DATA } from '../features/seeds/data/demoSeedsData';
import { CROP_PROTECTION_DATA } from '../features/crop_protection/data/demoCropProtectionData';
import { CROPS_DATA, MARKETPLACE_GOODS_DATA } from '../features/market/data/demoMarketData';
import { DEMO_JOBS_LIST } from '../features/jobs/data/demoJobsData';
import { DEMO_LAND_PARCELS } from '../features/land/data/demoLandData';

export const DOMAIN_META = {
  tools: { label: 'Tools', icon: '🚜', color: 'amber', route: 'tools' },
  seeds: { label: 'Seeds', icon: '🌱', color: 'emerald', route: 'seeds' },
  crop_protection: { label: 'Crop Care', icon: '🛡️', color: 'teal', route: 'crop_protection' },
  prices: { label: 'Prices', icon: '📈', color: 'amber', route: 'market' },
  marketplace: { label: 'Marketplace', icon: '🛒', color: 'emerald', route: 'market' },
  jobs: { label: 'Jobs', icon: '💼', color: 'emerald', route: 'jobs' },
  land: { label: 'Land', icon: '🌾', color: 'amber', route: 'land' },
  weather: { label: 'Weather', icon: '🌦️', color: 'sky', route: 'weather' },
  analytics: { label: 'Analytics', icon: '📊', color: 'purple', route: 'analytics' },
};

export const QUICK_SUGGESTIONS = [
  { label: 'Mahindra Tractor', query: 'Tractor', domain: 'tools' },
  { label: 'Samba Mahsuri Rice', query: 'Rice Seeds', domain: 'seeds' },
  { label: 'Mandi Tomato Prices', query: 'Tomato', domain: 'prices' },
  { label: 'Harvesting Workers', query: 'Harvesting', domain: 'jobs' },
  { label: 'River-Side Land Lease', query: 'River Land', domain: 'land' },
  { label: 'Bio Fungicide Spray', query: 'Fungicide', domain: 'crop_protection' },
  { label: 'Rainfall Forecast', query: 'Weather', domain: 'weather' },
  { label: 'Crop Profit ROI Matrix', query: 'Profit Matrix', domain: 'analytics' },
];

export const searchService = {
  /**
   * Search across all datasets using indexed multi-domain search.
   * @param {string} query - The search query term.
   * @param {string} categoryFilter - Optional domain filter ('all' | 'tools' | 'seeds' | etc.)
   * @returns {Promise<Array>} List of standardized search results.
   */
  async search(query = '', categoryFilter = 'all') {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return [];

    // Simulate minor network async tick for realistic UX (50ms)
    await new Promise((resolve) => setTimeout(resolve, 50));

    const results = [];

    // 1. TOOLS & MACHINERY
    if (categoryFilter === 'all' || categoryFilter === 'tools') {
      TOOLS_DATA.forEach((tool) => {
        const text = `${tool.name} ${tool.brand} ${tool.category} ${tool.subCategory || ''} ${tool.location} ${tool.model}`.toLowerCase();
        if (text.includes(cleanQuery)) {
          results.push({
            id: `tool-${tool.id}`,
            title: tool.name,
            snippet: `${tool.brand} • ${tool.model} • Available in ${tool.location}`,
            domain: 'tools',
            domainLabel: 'Tools',
            icon: '🚜',
            badge: tool.condition || 'Equipment',
            targetWorld: 'tools',
            targetItem: tool,
          });
        }
      });
    }

    // 2. SEEDS & GERMINATION
    if (categoryFilter === 'all' || categoryFilter === 'seeds') {
      SEEDS_DATA.forEach((seed) => {
        const text = `${seed.variety} ${seed.cropName} ${seed.brand} ${seed.category} ${seed.season}`.toLowerCase();
        if (text.includes(cleanQuery)) {
          results.push({
            id: `seed-${seed.id}`,
            title: `${seed.cropName} — ${seed.variety}`,
            snippet: `${seed.brand} • ₹${seed.price} (${seed.packSize}) • ${seed.season} Season`,
            domain: 'seeds',
            domainLabel: 'Seeds',
            icon: '🌱',
            badge: seed.category,
            targetWorld: 'seeds',
            targetItem: seed,
          });
        }
      });
    }

    // 3. CROP PROTECTION & PESTICIDES
    if (categoryFilter === 'all' || categoryFilter === 'crop_protection') {
      CROP_PROTECTION_DATA.forEach((cp) => {
        const text = `${cp.name} ${cp.brand} ${cp.categoryName} ${cp.category}`.toLowerCase();
        if (text.includes(cleanQuery)) {
          results.push({
            id: `cp-${cp.id}`,
            title: cp.name,
            snippet: `${cp.brand} • ${cp.categoryName} • ₹${cp.price}`,
            domain: 'crop_protection',
            domainLabel: 'Crop Protection',
            icon: '🛡️',
            badge: cp.categoryName,
            targetWorld: 'crop_protection',
            targetItem: cp,
          });
        }
      });
    }

    // 4. MARKET PRICES (MANDI)
    if (categoryFilter === 'all' || categoryFilter === 'prices') {
      CROPS_DATA.forEach((crop) => {
        const text = `${crop.name} ${crop.variety} ${crop.marketName} ${crop.category}`.toLowerCase();
        if (text.includes(cleanQuery)) {
          results.push({
            id: `price-${crop.id}`,
            title: `${crop.name} Mandi Rate (₹${crop.price}/${crop.unit})`,
            snippet: `${crop.variety} at ${crop.marketName} • Trend: ${crop.changeDirection === 'up' ? '▲ Rising' : '▼ Softening'} (${crop.changePercent}%)`,
            domain: 'prices',
            domainLabel: 'Prices',
            icon: '📈',
            badge: 'APMC Mandi',
            targetWorld: 'market',
            targetItem: crop,
          });
        }
      });
    }

    // 5. MARKETPLACE PRODUCTS
    if (categoryFilter === 'all' || categoryFilter === 'marketplace') {
      MARKETPLACE_GOODS_DATA.forEach((good) => {
        const text = `${good.name} ${good.categoryName} ${good.seller} ${good.location}`.toLowerCase();
        if (text.includes(cleanQuery)) {
          results.push({
            id: `good-${good.id}`,
            title: good.name,
            snippet: `Seller: ${good.seller} • ${good.location} • ₹${good.price}`,
            domain: 'marketplace',
            domainLabel: 'Marketplace',
            icon: '🛒',
            badge: good.categoryName,
            targetWorld: 'market',
            targetItem: good,
          });
        }
      });
    }

    // 6. JOBS & WORK
    if (categoryFilter === 'all' || categoryFilter === 'jobs') {
      DEMO_JOBS_LIST.forEach((job) => {
        const text = `${job.title} ${job.farmerName} ${job.location} ${job.category} ${job.cropName}`.toLowerCase();
        if (text.includes(cleanQuery)) {
          results.push({
            id: `job-${job.id}`,
            title: job.title,
            snippet: `${job.farmerName} • ${job.location} • ₹${job.salary}/Day`,
            domain: 'jobs',
            domainLabel: 'Jobs',
            icon: '💼',
            badge: `${job.workersRequired} Workers`,
            targetWorld: 'jobs',
            targetItem: job,
          });
        }
      });
    }

    // 7. LAND LEASE
    if (categoryFilter === 'all' || categoryFilter === 'land') {
      DEMO_LAND_PARCELS.forEach((parcel) => {
        const text = `${parcel.title} ${parcel.location} ${parcel.district} ${parcel.soilTypeName} ${parcel.waterSourceName}`.toLowerCase();
        if (text.includes(cleanQuery)) {
          results.push({
            id: `land-${parcel.id}`,
            title: `${parcel.acreage} Acre — ${parcel.title}`,
            snippet: `${parcel.district} Dist • ${parcel.soilTypeName} • ₹${parcel.annualRentPerAcre.toLocaleString()}/Acre/Yr`,
            domain: 'land',
            domainLabel: 'Land',
            icon: '🌾',
            badge: `${parcel.acreage} Acres`,
            targetWorld: 'land',
            targetItem: parcel,
          });
        }
      });
    }

    // 8. WEATHER KEYWORDS
    if (
      (categoryFilter === 'all' || categoryFilter === 'weather') &&
      ('weather live climate forecast rain temperature atmosphere humidity wind'.includes(cleanQuery) ||
        cleanQuery.includes('weather') ||
        cleanQuery.includes('rain') ||
        cleanQuery.includes('temp'))
    ) {
      results.push({
        id: 'nav-weather',
        title: 'Live Weather Radar & Micro-Climate Intelligence',
        snippet: 'Real-time sensor data, hourly forecast, spray advisory & rainfall probabilities',
        domain: 'weather',
        domainLabel: 'Weather',
        icon: '🌦️',
        badge: 'Live Radar',
        targetWorld: 'weather',
      });
    }

    // 9. ANALYTICS KEYWORDS
    if (
      (categoryFilter === 'all' || categoryFilter === 'analytics') &&
      ('analytics ai intelligence calculator profit roi break-even margin sensitivity simulation matrix'.includes(cleanQuery) ||
        cleanQuery.includes('profit') ||
        cleanQuery.includes('roi') ||
        cleanQuery.includes('calculator') ||
        cleanQuery.includes('analysis'))
    ) {
      results.push({
        id: 'nav-analytics',
        title: 'Agricultural Analytics & Investment Decision Lab',
        snippet: 'Acreage economics, revenue calculator, price sensitivity models & crop comparison matrix',
        domain: 'analytics',
        domainLabel: 'Analytics',
        icon: '📊',
        badge: 'AI Intel',
        targetWorld: 'analytics',
      });
    }

    return results;
  },
};
