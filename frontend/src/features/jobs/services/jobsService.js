import { apiClient } from '../../../api/apiClient';
import { DEMO_JOBS_LIST } from '../data/demoJobsData';

/**
 * Jobs & Labor Market Service Layer
 * Integrated with Spring Boot REST API (/api/jobs) & MySQL database.
 */
class JobsService {
  async getJobs({ crop = 'all', status = 'ALL', location = '', search = '' } = {}) {
    let apiJobs = [];
    try {
      const params = new URLSearchParams();
      if (crop && crop !== 'all') params.append('crop', crop);
      if (status && status !== 'ALL') params.append('status', status);
      if (location) params.append('location', location);
      if (search) params.append('search', search);

      const response = await apiClient.get(`/jobs?${params.toString()}`);
      if (response && Array.isArray(response.content)) {
        apiJobs = response.content.map((item) => ({
          id: `db-job-${item.id}`,
          realDbId: item.id,
          title: item.title,
          farmerName: item.farmerName || 'Verified Agro Farmer',
          location: item.location,
          crop: item.crop || 'Paddy Rice',
          salary: `₹${item.dailyWage}/day`,
          dailyWageNum: item.dailyWage,
          workersRequired: item.requiredWorkers || 5,
          workersFilled: item.filledWorkers || 0,
          durationDays: 5,
          startDate: item.startDate || 'Immediate',
          postedDate: 'Today',
          urgency: 'HIGH',
          status: item.status || 'ACTIVE',
          description: item.description,
          farmerPhone: item.farmerPhone || '+91 98480 12345',
        }));
      }
    } catch (e) {
      console.warn('Backend API /jobs unreachable. Using fallback demo jobs.', e);
    }

    let list = [...apiJobs, ...DEMO_JOBS_LIST];
    if (crop && crop !== 'all') {
      list = list.filter((j) => j.crop.toLowerCase().includes(crop.toLowerCase()));
    }
    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.farmerName.toLowerCase().includes(q)
      );
    }
    return list;
  }

  async createJob(formData) {
    const rawCat = (formData.category || 'harvesting').toLowerCase();
    let jobCat = 'HARVESTING';
    if (rawCat.includes('plant') || rawCat.includes('sow')) jobCat = 'SOWING_PLANTING';
    else if (rawCat.includes('weed')) jobCat = 'WEEDING';
    else if (rawCat.includes('prun')) jobCat = 'PRUNING';
    else if (rawCat.includes('irrigat')) jobCat = 'IRRIGATION_MANAGEMENT';
    else if (rawCat.includes('fertil')) jobCat = 'FERTILIZER_APPLICATION';
    else if (rawCat.includes('pest')) jobCat = 'PEST_CONTROL';
    else if (rawCat.includes('drive') || rawCat.includes('tractor')) jobCat = 'TRACTOR_DRIVING';
    else if (rawCat.includes('pack')) jobCat = 'PACKAGING_LOADING';

    const payload = {
      title: formData.title,
      description: formData.description || `Required ${formData.workersRequired || 5} agricultural workers for ${formData.crop || 'crop'} operations.`,
      category: jobCat,
      crop: formData.crop || 'Rice',
      location: formData.location || 'Tenali, AP',
      district: formData.district || 'Guntur',
      state: formData.state || 'Andhra Pradesh',
      startDate: formData.startDate || new Date().toISOString().split('T')[0],
      endDate: formData.endDate || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      estimatedDays: 7,
      workersRequired: parseInt(formData.workersRequired) || 5,
      wage: parseFloat(formData.dailyWage || formData.salary) || 650,
      wageType: 'PER_DAY',
      accommodationProvided: formData.accommodationProvided || false,
      foodProvided: formData.foodProvided !== false,
      transportProvided: formData.transportProvided !== false,
      toolsProvided: formData.toolsProvided || 'All standard harvesting tools provided',
      experienceRequired: formData.experienceRequired || 'Farm work experience',
    };

    const response = await apiClient.post('/jobs', payload);
    return {
      success: true,
      jobId: `JOB-DB-${response.id || Math.floor(1000 + Math.random() * 9000)}`,
      data: response,
    };
  }

  async applyForJob(jobId, applicationData) {
    const rawId = typeof jobId === 'string' ? jobId.replace('db-job-', '') : jobId;
    const response = await apiClient.post(`/jobs/${rawId}/apply`, {
      notes: applicationData.notes || 'Worker job application submitted via AgriNexus UI',
      expectedWage: parseFloat(applicationData.expectedWage) || 600,
    });
    return {
      success: true,
      applicationId: `APP-DB-${response.id}`,
      data: response,
    };
  }

  async getMyApplications() {
    try {
      const list = await apiClient.get('/jobs/my-applications');
      if (Array.isArray(list)) {
        return list.map((app) => ({
          applicationId: `app-db-${app.id}`,
          realDbId: app.id,
          jobId: `db-job-${app.jobId}`,
          jobTitle: app.jobTitle,
          farmerName: app.farmerName,
          location: app.location || 'AP',
          salary: `₹${app.expectedWage}/day`,
          appliedDate: app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'Recent',
          status: app.status || 'APPLIED',
          applicantName: app.applicantName,
          phone: app.applicantPhone,
        }));
      }
    } catch (e) {
      console.warn('Failed to fetch my applications from API', e);
    }
    return [];
  }

  async getMyPostedJobs() {
    try {
      const list = await apiClient.get('/jobs/my-posted-jobs');
      if (Array.isArray(list)) {
        return list.map((j) => ({
          id: `db-job-${j.id}`,
          realDbId: j.id,
          title: j.title,
          location: j.location,
          crop: j.crop,
          salary: `₹${j.dailyWage}/day`,
          workersRequired: j.requiredWorkers,
          status: j.status,
          postedDate: 'Recent',
          applicants: (j.applications || []).map((a) => ({
            id: `app-db-${a.id}`,
            realDbId: a.id,
            name: a.applicantName,
            phone: a.applicantPhone,
            experience: 'Agricultural Worker',
            skills: a.notes || 'Crop labor',
            rating: 4.8,
            status: a.status,
          })),
        }));
      }
    } catch (e) {
      console.warn('Failed to fetch my posted jobs from API', e);
    }
    return [];
  }

  async acceptApplication(applicationId) {
    const rawId = typeof applicationId === 'string' ? applicationId.replace('app-db-', '') : applicationId;
    const response = await apiClient.patch(`/jobs/applications/${rawId}/accept`, {});
    return response;
  }
}

export const jobsService = new JobsService();
