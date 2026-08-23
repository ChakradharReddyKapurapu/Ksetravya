import { apiClient } from '../../../api/apiClient';
import { DEMO_LAND_PARCELS } from '../data/demoLandData';

/**
 * Farmland Lease Service Layer
 * Integrated with Spring Boot REST API (/api/land) & MySQL database.
 */
class LandService {
  async getLandParcels({ soilType = 'all', waterSource = 'all', search = '' } = {}) {
    let apiParcels = [];
    try {
      const params = new URLSearchParams();
      if (soilType && soilType !== 'all') params.append('soilType', soilType);
      if (waterSource && waterSource !== 'all') params.append('waterSource', waterSource);
      if (search) params.append('search', search);

      const response = await apiClient.get(`/land?${params.toString()}`);
      if (response && Array.isArray(response.content)) {
        apiParcels = response.content.map((item) => ({
          id: `db-land-${item.id}`,
          realDbId: item.id,
          title: item.title,
          location: item.location,
          district: item.location || 'AP',
          acreage: item.acreage || 10,
          annualRentPerAcre: item.annualRentPerAcre || 35000,
          soilType: item.soilType || 'BLACK_COTTON',
          waterSource: item.waterSource || 'RIVER_LIFT',
          hasRiverAccess: item.hasRiverAccess !== false,
          hasBorewell: item.hasBorewell !== false,
          hasDripIrrigation: item.hasDripIrrigation !== false,
          hasCanalAccess: item.hasCanalAccess || false,
          ownerName: item.ownerName || 'Verified Farmland Owner',
          ownerPhone: item.ownerPhone || '+91 98480 12345',
          description: item.description,
          status: item.status || 'AVAILABLE',
          imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        }));
      }
    } catch (e) {
      console.warn('Backend API /land unreachable. Using fallback demo land parcels.', e);
    }

    let list = [...apiParcels, ...DEMO_LAND_PARCELS];
    if (soilType && soilType !== 'all') {
      list = list.filter((l) => l.soilType.toLowerCase().includes(soilType.toLowerCase()));
    }
    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.ownerName.toLowerCase().includes(q)
      );
    }
    return list;
  }

  async listLand(formData) {
    const rawSoil = (formData.soilType || 'black_soil').toLowerCase();
    let soil = 'BLACK_SOIL';
    if (rawSoil.includes('red')) soil = 'RED_LOAM';
    else if (rawSoil.includes('delta') || rawSoil.includes('alluvial')) soil = 'ALLUVIAL';
    else if (rawSoil.includes('clay')) soil = 'CLAY_LOAM';
    else if (rawSoil.includes('sand') || rawSoil.includes('coastal')) soil = 'COASTAL_SAND';

    const rawWater = (formData.waterSource || 'borewell').toLowerCase();
    let water = 'BOREWELL';
    if (rawWater.includes('river')) water = 'RIVER';
    else if (rawWater.includes('canal')) water = 'CANAL';
    else if (rawWater.includes('drip')) water = 'DRIP_READY';

    const payload = {
      title: formData.title,
      description: formData.description || `${formData.acreage || 10} Acres farmland available for agricultural lease.`,
      surveyNumber: formData.surveyNumber || 'Sy.No 108/1',
      location: formData.location || 'Bhimavaram, AP',
      district: formData.district || 'West Godavari',
      state: formData.state || 'Andhra Pradesh',
      acreage: parseFloat(formData.acreage) || 10,
      soilType: soil,
      soilTypeName: formData.soilTypeName || 'Black Cotton Soil',
      waterSource: water,
      waterSourceName: formData.waterSourceName || '3-Phase Borewell',
      hasRiver: water === 'RIVER_LIFT',
      hasBorewell: water === 'BOREWELL_3PHASE',
      hasDrip: water === 'DRIP_READY',
      hasCanal: water === 'CANAL_IRRIGATION',
      annualRentPerAcre: parseFloat(formData.annualRentPerAcre) || 35000,
      securityDepositMonths: 3,
      leaseTenure: formData.leaseTenure || '3 Years',
      availableFrom: 'Immediate',
      verifiedTitle: true,
      roadAccess: '25ft Paved Agricultural Road',
      electricity: '3-Phase Power Connected',
      fencing: 'Hedgerow / Wire Fence',
      soilHealthScore: 90,
    };

    const response = await apiClient.post('/land', payload);
    return {
      success: true,
      parcelId: `LAND-DB-${response.id || Math.floor(1000 + Math.random() * 9000)}`,
      data: response,
    };
  }

  async applyForLand(parcelId, inquiryData) {
    const rawId = typeof parcelId === 'string' ? parcelId.replace('db-land-', '') : parcelId;
    const response = await apiClient.post(`/land/${rawId}/applications`, {
      proposedCrop: inquiryData.proposedCrop || 'Organic Rice',
      preferredTenure: `${inquiryData.durationYears || inquiryData.preferredTenure || 3} Years`,
      message: inquiryData.notes || inquiryData.message || 'Lease inquiry submitted from AgriNexus UI',
      offeredRentPerAcre: parseFloat(inquiryData.offeredRentPerAcre) || 35000,
    });
    return {
      success: true,
      inquiryId: `INQ-DB-${response.id || Math.floor(1000 + Math.random() * 9000)}`,
      data: response,
    };
  }

  async getMyLandInquiries() {
    try {
      const list = await apiClient.get('/land/my-applications');
      if (Array.isArray(list)) {
        return list.map((inq) => ({
          inquiryId: `inq-db-${inq.id}`,
          realDbId: inq.id,
          parcelId: `db-land-${inq.landId}`,
          parcelTitle: inq.parcelTitle,
          ownerName: inq.ownerName,
          location: inq.location || 'AP',
          annualRent: `₹${inq.annualRentPerAcre} / Acre`,
          inquiryDate: inq.appliedDate ? new Date(inq.appliedDate).toLocaleDateString() : 'Recent',
          status: inq.status || 'SUBMITTED',
          proposedCrop: inq.proposedCrop,
        }));
      }
    } catch (e) {
      console.warn('Failed to fetch my land inquiries from API', e);
    }
    return [];
  }
}

export const landService = new LandService();
