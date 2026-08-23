import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { jobsService } from '../features/jobs/services/jobsService';
import {
  JOB_CATEGORIES,
  DEMO_JOBS_LIST,
  DEMO_WORKERS_LIST,
  SALARY_BENCHMARKS,
} from '../features/jobs/data/demoJobsData';
import { useWorld } from './WorldContext';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const { myCrop, setMyCrop } = useWorld();

  // Dynamic jobs list from API
  const [jobsList, setJobsList] = useState(DEMO_JOBS_LIST);
  const [loadingJobs, setLoadingJobs] = useState(false);

  // Mode: 'worker' (Find Work) | 'farmer' (Find Workers / Post Jobs)
  const [activeRole, setActiveRole] = useState('worker');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeCrop, setActiveCropState] = useState(myCrop?.id || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isApplicationsModalOpen, setIsApplicationsModalOpen] = useState(false);
  const [isFarmerDashboardModalOpen, setIsFarmerDashboardModalOpen] = useState(false);
  const [travelHUDMessage, setTravelHUDMessage] = useState(null);

  // Worker's Submitted Applications & Farmer's Posted Jobs
  const [myApplications, setMyApplications] = useState([]);
  const [myPostedJobs, setMyPostedJobs] = useState([]);

  const refreshJobs = async () => {
    setLoadingJobs(true);
    try {
      const data = await jobsService.getJobs({
        crop: activeCrop,
        search: searchQuery,
      });
      setJobsList(data);

      const apps = await jobsService.getMyApplications();
      if (apps && apps.length > 0) {
        setMyApplications(apps);
      }

      const posted = await jobsService.getMyPostedJobs();
      if (posted && posted.length > 0) {
        setMyPostedJobs(posted);
      }
    } catch (e) {
      console.error('Failed to load jobs from API', e);
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    refreshJobs();
  }, [activeCrop, searchQuery]);

  const triggerHUD = (msg) => {
    setTravelHUDMessage(msg);
    setTimeout(() => setTravelHUDMessage(null), 2500);
  };

  const setActiveCrop = (cropId) => {
    setActiveCropState(cropId);
    triggerHUD(`Focusing ${cropId.toUpperCase()} Field Work Environment...`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const q = query.toLowerCase().trim();
    if (!q) return;

    if (q.includes('tractor') || q.includes('driver')) {
      setActiveCategory('tractor');
      triggerHUD('Filtering Tractor Operator Roles...');
    } else if (q.includes('harvest') || q.includes('cutting')) {
      setActiveCategory('harvesting');
      triggerHUD('Filtering Harvesting Jobs...');
    } else if (q.includes('plant') || q.includes('transplant')) {
      setActiveCategory('planting');
      triggerHUD('Filtering Planting Roles...');
    } else if (q.includes('spray') || q.includes('pesticide')) {
      setActiveCategory('spraying');
      triggerHUD('Filtering Crop Spraying Teams...');
    } else if (q.includes('rice') || q.includes('paddy')) {
      setActiveCrop('rice');
    } else if (q.includes('cotton')) {
      setActiveCrop('cotton');
    } else if (q.includes('chilli')) {
      setActiveCrop('chilli');
    } else if (q.includes('mango')) {
      setActiveCrop('mango');
    }
  };

  // Worker Applies for Job
  const applyForJob = async (job, applicationForm) => {
    try {
      await jobsService.applyForJob(job.id || job.realDbId, {
        notes: `${applicationForm.name} - Skills: ${applicationForm.skills || 'Labor'}. ${applicationForm.message || ''}`,
        expectedWage: parseFloat(job.salary || 600) || 600,
      });
      refreshJobs();
      triggerHUD(`Application Submitted for ${job.title.split(' ')[0]}!`);
    } catch (e) {
      console.warn('API application failed, fallback to local application state', e);
      const newApp = {
        applicationId: `app-${Date.now()}`,
        jobId: job.id,
        jobTitle: job.title,
        farmerName: job.farmerName,
        location: job.location,
        salary: `₹${job.salary} ${job.salaryUnit || '/day'}`,
        appliedDate: 'Today',
        status: 'APPLIED',
        applicantName: applicationForm.name,
        phone: applicationForm.phone,
        experience: applicationForm.experience,
        skills: applicationForm.skills,
        message: applicationForm.message,
      };
      setMyApplications((prev) => [newApp, ...prev]);
      triggerHUD(`Application Submitted for ${job.title.split(' ')[0]}!`);
    }
  };

  // Farmer Posts New Job
  const postNewJob = async (formData) => {
    try {
      await jobsService.createJob({
        title: formData.title,
        description: formData.description || `Required ${formData.workersRequired} workers for ${formData.cropName || formData.crop} in ${formData.location}.`,
        location: formData.location,
        crop: formData.cropName || formData.crop || 'Rice',
        dailyWage: parseFloat(formData.salary) || 650,
        workersRequired: parseInt(formData.workersRequired) || 5,
        startDate: formData.startDate,
        endDate: formData.endDate,
      });
      refreshJobs();
      triggerHUD(`New Job Listing Published for ${formData.workersRequired} Workers!`);
    } catch (e) {
      console.warn('API job creation failed, fallback to local state', e);
      const newPostedJobFarmer = {
        id: `job-custom-${Date.now()}`,
        title: formData.title,
        location: formData.location,
        crop: formData.cropName || formData.crop,
        salary: `₹${formData.salary}/day`,
        workersRequired: formData.workersRequired,
        status: 'ACTIVE',
        postedDate: 'Today',
        applicants: [],
      };
      setMyPostedJobs((prev) => [newPostedJobFarmer, ...prev]);
      triggerHUD(`New Job Listing Published for ${formData.workersRequired} Workers!`);
    }
  };

  // Farmer Accepts Applicant
  const acceptApplicant = async (jobId, applicantId) => {
    try {
      await jobsService.acceptApplication(applicantId);
      refreshJobs();
      triggerHUD('Applicant Accepted! Contact details unlocked.');
    } catch (e) {
      setMyPostedJobs((prev) =>
        prev.map((job) => {
          if (job.id === jobId) {
            return {
              ...job,
              applicants: job.applicants.map((a) =>
                a.id === applicantId ? { ...a, status: 'ACCEPTED' } : a
              ),
            };
          }
          return job;
        })
      );
      triggerHUD('Applicant Accepted!');
    }
  };

  // Farmer Rejects Applicant
  const rejectApplicant = (jobId, applicantId) => {
    setMyPostedJobs((prev) =>
      prev.map((job) => {
        if (job.id === jobId) {
          return {
            ...job,
            applicants: job.applicants.map((a) =>
              a.id === applicantId ? { ...a, status: 'REJECTED' } : a
            ),
          };
        }
        return job;
      })
    );
    triggerHUD('Applicant updated.');
  };

  // Filtered Job Listings
  const filteredJobs = useMemo(() => {
    return jobsList.filter((job) => {
      if (activeCategory !== 'all' && job.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          (job.title && job.title.toLowerCase().includes(q)) ||
          (job.location && job.location.toLowerCase().includes(q)) ||
          (job.crop && job.crop.toLowerCase().includes(q)) ||
          (job.farmerName && job.farmerName.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [jobsList, activeCategory, activeCrop, searchQuery]);

  // Filtered Worker Profiles
  const filteredWorkers = useMemo(() => {
    return DEMO_WORKERS_LIST.filter((worker) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          worker.name.toLowerCase().includes(q) ||
          worker.role.toLowerCase().includes(q) ||
          worker.location.toLowerCase().includes(q) ||
          worker.skills.some((s) => s.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [searchQuery]);

  return (
    <JobsContext.Provider
      value={{
        activeRole,
        setActiveRole,
        activeCategory,
        setActiveCategory,
        activeCrop,
        setActiveCrop,
        searchQuery,
        setSearchQuery: handleSearch,
        selectedJob,
        setSelectedJob,
        selectedWorker,
        setSelectedWorker,
        isApplyModalOpen,
        setIsApplyModalOpen,
        isPostJobModalOpen,
        setIsPostJobModalOpen,
        isApplicationsModalOpen,
        setIsApplicationsModalOpen,
        isFarmerDashboardModalOpen,
        setIsFarmerDashboardModalOpen,
        travelHUDMessage,
        myApplications,
        myPostedJobs,
        applyForJob,
        postNewJob,
        acceptApplicant,
        rejectApplicant,
        filteredJobs,
        filteredWorkers,
        allCategories: JOB_CATEGORIES,
        allJobs: DEMO_JOBS_LIST,
        allWorkers: DEMO_WORKERS_LIST,
        salaryBenchmarks: SALARY_BENCHMARKS,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error('useJobs must be used within JobsProvider');
  return ctx;
};
