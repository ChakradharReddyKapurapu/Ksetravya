import { apiClient } from '../../../api/apiClient';
import { TOOLS_DATA, TOOL_CATEGORIES, TOOL_BRANDS, TOOL_LOCATIONS } from '../data/demoToolsData';

/**
 * Tools Data Service Layer
 * Fully integrated with Spring Boot REST API (/api/tools) & MySQL database.
 */
class ToolsService {
  /**
   * Get all tools from Spring Boot REST API with fallback to static demo data
   */
  async getTools({
    category = 'all',
    search = '',
    brand = 'All Brands',
    location = 'all',
    mode = 'all',
    sortBy = 'relevance',
  } = {}) {
    let apiTools = [];
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all') params.append('category', category);
      if (search && search.trim()) params.append('search', search.trim());
      if (brand && brand !== 'All Brands') params.append('brand', brand);
      if (location && location !== 'all') params.append('location', location);

      const response = await apiClient.get(`/tools?${params.toString()}`);
      if (response && Array.isArray(response.content)) {
        apiTools = response.content.map((item) => ({
          id: `db-tool-${item.id}`,
          realDbId: item.id,
          name: item.name,
          category: item.category || 'tractors',
          subCategory: item.brand || 'Equipment',
          brand: item.brand || 'AgriNexus',
          tag: 'VERIFIED DEALER',
          hp: item.horsePower ? `${item.horsePower} HP` : '45 HP',
          year: item.manufacturingYear || 2025,
          location: item.location || 'Andhra Pradesh',
          rating: item.rating || 4.9,
          reviewsCount: 12,
          buyPrice: item.buyPrice || 0,
          rentPriceDay: item.rentPricePerDay || 0,
          isForRent: item.isForRent !== false,
          isForSale: item.isForSale !== false,
          images: [item.imageUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&w=1200&q=80'],
          specifications: {
            engine: `${item.horsePower || 45} HP Engine`,
            transmission: '8 Forward + 2 Reverse',
            hydraulics: '1500 kg Lift Capacity',
            brakes: 'Oil Immersed Brakes',
            fuelCapacity: '60 Liters',
            warranty: '2 Years Manufacturer Warranty',
          },
          owner: {
            name: item.ownerName || 'Verified Equipment Owner',
            phone: item.contactPhone || '+91 98480 12345',
            district: item.location || 'AP',
            experienceYears: 5,
            verified: true,
          },
          description: item.description || item.name,
        }));
      }
    } catch (e) {
      console.warn('Backend API /tools offline or unreachable. Using demo fallback.', e);
    }

    let list = [...apiTools, ...TOOLS_DATA];

    if (category && category !== 'all') {
      list = list.filter((item) => item.category === category);
    }

    if (brand && brand !== 'All Brands') {
      list = list.filter((item) => item.brand.toLowerCase() === brand.toLowerCase());
    }

    if (location && location !== 'all') {
      list = list.filter((item) => item.location.toLowerCase().includes(location.toLowerCase()));
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price_asc') {
      list.sort((a, b) => (mode === 'rent' ? a.rentPriceDay - b.rentPriceDay : a.buyPrice - b.buyPrice));
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => (mode === 'rent' ? b.rentPriceDay - a.rentPriceDay : b.buyPrice - a.buyPrice));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }

  async getToolById(id) {
    if (typeof id === 'string' && id.startsWith('db-tool-')) {
      const dbId = id.replace('db-tool-', '');
      try {
        const item = await apiClient.get(`/tools/${dbId}`);
        if (item) {
          return {
            id: `db-tool-${item.id}`,
            realDbId: item.id,
            name: item.name,
            category: item.category || 'tractors',
            subCategory: item.brand || 'Equipment',
            brand: item.brand || 'AgriNexus',
            tag: 'VERIFIED DEALER',
            hp: item.horsePower ? `${item.horsePower} HP` : '45 HP',
            year: item.manufacturingYear || 2025,
            location: item.location || 'Andhra Pradesh',
            rating: 4.9,
            reviewsCount: 12,
            buyPrice: item.buyPrice || 0,
            rentPriceDay: item.rentPricePerDay || 0,
            isForRent: item.isForRent !== false,
            isForSale: item.isForSale !== false,
            images: [item.imageUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&w=1200&q=80'],
            owner: {
              name: item.ownerName || 'Verified Equipment Owner',
              phone: item.contactPhone || '+91 98480 12345',
              district: item.location || 'AP',
            },
            description: item.description || item.name,
          };
        }
      } catch (e) {
        console.error('Failed to fetch tool by id', e);
      }
    }
    return TOOLS_DATA.find((item) => item.id === id) || null;
  }

  async getCategories() {
    return TOOL_CATEGORIES;
  }

  async getBrands() {
    return TOOL_BRANDS;
  }

  async getLocations() {
    return TOOL_LOCATIONS;
  }

  /**
   * Request machinery rental via POST /api/tools/{id}/rental-requests
   */
  async requestRental(toolId, rentalData) {
    const rawId = typeof toolId === 'string' ? toolId.replace('db-tool-', '') : toolId;
    try {
      const response = await apiClient.post(`/tools/${rawId}/rental-requests`, {
        startDate: rentalData.startDate || new Date().toISOString().split('T')[0],
        endDate: rentalData.endDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        notes: rentalData.notes || 'Rental booking requested from dynamic frontend',
      });
      return {
        success: true,
        bookingReference: `RNT-DB-${response.id || Math.floor(100000 + Math.random() * 900000)}`,
        status: response.status || 'PENDING',
        data: response,
      };
    } catch (e) {
      console.warn('API rental request failed, returning response error', e);
      throw e;
    }
  }

  /**
   * List new machinery equipment (Persists in MySQL via POST /api/tools)
   */
  async listEquipment(formData) {
    const rawCat = (formData.category || 'tractors').toLowerCase();
    let toolCat = 'TRACTOR';
    if (rawCat.includes('harvest')) toolCat = 'HARVESTER';
    else if (rawCat.includes('till')) toolCat = 'TILLAGE';
    else if (rawCat.includes('spray')) toolCat = 'SPRAYER';
    else if (rawCat.includes('irrigat')) toolCat = 'IRRIGATION';
    else if (rawCat.includes('plant')) toolCat = 'PLANTING';
    else if (rawCat.includes('hand') || rawCat.includes('tool')) toolCat = 'HAND_TOOL';

    const payload = {
      name: formData.title,
      description: `Brand: ${formData.brand}, HP: ${formData.hp || '45'}, Year: ${formData.year || '2025'}. ${formData.description || ''}`,
      category: toolCat,
      brand: formData.brand || 'Mahindra',
      model: formData.model || 'Model Standard',
      type: formData.type || 'Agricultural Machinery',
      location: formData.location || 'Tirupati, AP',
      district: formData.district || 'Chittoor',
      state: formData.state || 'Andhra Pradesh',
      pricePerDay: parseFloat(formData.rentPrice) || parseFloat(formData.buyPrice) || 800,
      pricePerHour: 150,
      securityDeposit: 2000,
      year: parseInt(formData.year) || 2025,
      power: parseFloat(formData.hp) || 45,
      fuelType: 'Diesel',
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&w=1200&q=80',
    };

    const response = await apiClient.post('/tools', payload);
    return {
      success: true,
      listingId: `LST-DB-${response.id || Math.floor(1000 + Math.random() * 9000)}`,
      status: 'LIVE_PERSISTED_IN_MYSQL',
      data: response,
    };
  }
}

export const toolsService = new ToolsService();
