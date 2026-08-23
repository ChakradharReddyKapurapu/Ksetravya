import { SEEDS_DATA, SEED_CROPS, SEED_CATEGORIES } from '../data/demoSeedsData';

export const seedsService = {
  getSeeds: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...SEEDS_DATA]), 100);
    });
  },

  getSeedById: async (id) => {
    return new Promise((resolve) => {
      const seed = SEEDS_DATA.find((s) => s.id === id);
      setTimeout(() => resolve(seed || null), 100);
    });
  },

  getCrops: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...SEED_CROPS]), 50);
    });
  },

  getCategories: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...SEED_CATEGORIES]), 50);
    });
  },
};
