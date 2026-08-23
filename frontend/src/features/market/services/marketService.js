import { apiClient } from '../../../api/apiClient';
import { CROPS_DATA, MARKETS_LIST, TRANSPORT_VEHICLES, MARKETPLACE_GOODS_DATA } from '../data/demoMarketData';

/**
 * Market & Marketplace Goods Service Layer
 * Integrated with Spring Boot REST API (/api/marketplace/products) & MySQL database.
 */
class MarketService {
  async getCrops({ category = 'all', search = '', marketId = 'tirupati' } = {}) {
    await new Promise((r) => setTimeout(r, 40));
    let list = [...CROPS_DATA];

    if (category && category !== 'all') {
      list = list.filter((c) => c.category === category);
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.variety.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    return list;
  }

  async getMarketplaceGoods({ category = 'all', search = '' } = {}) {
    let apiGoods = [];
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all') params.append('category', category);
      if (search) params.append('search', search);

      const response = await apiClient.get(`/marketplace/products?${params.toString()}`);
      if (response && Array.isArray(response.content)) {
        apiGoods = response.content.map((item) => ({
          id: `db-prod-${item.id}`,
          realDbId: item.id,
          name: item.name,
          category: item.category || 'produce',
          categoryName: item.category || 'Agricultural Produce',
          price: `₹${item.price} / ${item.unit || 'Quintal'}`,
          priceNum: item.price,
          unit: item.unit || 'Quintal',
          seller: item.sellerName || 'Verified Agri Farmer',
          location: item.location || 'AP',
          rating: 4.9,
          stock: `${item.quantityAvailable || 100} ${item.unit || 'Quintal'}`,
          imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
          description: item.description,
          phone: item.contactPhone || '+91 98480 12345',
        }));
      }
    } catch (e) {
      console.warn('Backend API /marketplace/products unreachable. Using demo fallback goods.', e);
    }

    let list = [...apiGoods, ...MARKETPLACE_GOODS_DATA];
    if (category && category !== 'all') {
      list = list.filter((g) => g.category === category);
    }
    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.seller.toLowerCase().includes(q) ||
          g.location.toLowerCase().includes(q)
      );
    }
    return list;
  }

  async listProduct(formData) {
    const rawCat = (formData.category || 'grains').toLowerCase();
    let prodCat = 'GRAINS';
    if (rawCat.includes('veg')) prodCat = 'VEGETABLES';
    else if (rawCat.includes('fruit')) prodCat = 'FRUITS';
    else if (rawCat.includes('seed')) prodCat = 'SEEDS';
    else if (rawCat.includes('fertil')) prodCat = 'FERTILIZERS';
    else if (rawCat.includes('organ')) prodCat = 'ORGANIC_PRODUCTS';
    else if (rawCat.includes('equip') || rawCat.includes('tool')) prodCat = 'FARM_EQUIPMENT';

    const payload = {
      name: formData.title || formData.name,
      description: formData.description || `Fresh produce available for direct purchase in ${formData.location || 'Guntur, AP'}.`,
      category: prodCat,
      subcategory: formData.subcategory || 'Standard Produce',
      brand: formData.brand || 'AgriNexus Verified',
      price: parseFloat(formData.price) || 2800,
      unit: formData.unit || 'Quintal',
      stockQuantity: parseInt(formData.quantity) || 100,
      location: formData.location || 'Guntur, AP',
      district: formData.district || 'Guntur',
      state: formData.state || 'Andhra Pradesh',
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
    };

    const response = await apiClient.post('/marketplace/products', payload);
    return {
      success: true,
      productId: `PROD-DB-${response.id || Math.floor(1000 + Math.random() * 9000)}`,
      data: response,
    };
  }

  async getCropById(cropId) {
    return CROPS_DATA.find((c) => c.id === cropId) || null;
  }

  async getMarkets() {
    return MARKETS_LIST;
  }

  async getMarketInsights() {
    const list = [...CROPS_DATA];
    const topGainer = [...list].sort((a, b) => b.changePercent - a.changePercent)[0];
    const mostStable = [...list].sort((a, b) => Math.abs(a.changePercent) - Math.abs(b.changePercent))[0];
    const highestPriced = [...list].filter((c) => c.unit === 'kg').sort((a, b) => b.price - a.price)[0];

    return {
      topGainer,
      mostStable,
      highestPriced,
      totalArrivals: '32,450 Quintals',
      activeCommodities: list.length,
      averageMandiSentiment: '+3.8% Bullish',
    };
  }

  async getTransportVehicles() {
    return TRANSPORT_VEHICLES;
  }
}

export const marketService = new MarketService();
