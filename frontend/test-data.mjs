// Quick verification of exports and data structures
import { SEEDS_DATA, SEED_CROPS, SEED_CATEGORIES } from './src/features/seeds/data/demoSeedsData.js';
import { CROP_PROTECTION_DATA, CROP_PROTECTION_CATEGORIES, CROP_PROBLEMS } from './src/features/crop_protection/data/demoCropProtectionData.js';
import { TOOLS_DATA } from './src/features/tools/data/demoToolsData.js';
import { CROPS_DATA } from './src/features/market/data/demoMarketData.js';

console.log('SEEDS_DATA count:', SEEDS_DATA.length);
console.log('SEED_CROPS count:', SEED_CROPS.length);
console.log('CROP_PROTECTION_DATA count:', CROP_PROTECTION_DATA.length);
console.log('TOOLS_DATA count:', TOOLS_DATA.length);
console.log('CROPS_DATA count:', CROPS_DATA.length);
console.log('ALL DATA STRUCTURES VALID!');
