import { CROP_PROTECTION_DATA, CROP_PROTECTION_CATEGORIES, CROP_PROBLEMS } from '../data/demoCropProtectionData';

export const cropProtectionService = {
  getProducts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...CROP_PROTECTION_DATA]), 100);
    });
  },

  getProductById: async (id) => {
    return new Promise((resolve) => {
      const p = CROP_PROTECTION_DATA.find((item) => item.id === id);
      setTimeout(() => resolve(p || null), 100);
    });
  },

  getCategories: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...CROP_PROTECTION_CATEGORIES]), 50);
    });
  },

  getProblems: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...CROP_PROBLEMS]), 50);
    });
  },
};
