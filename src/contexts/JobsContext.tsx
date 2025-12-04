import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: string;
  description: string;
  skills: string[];
  postedBy: string;
  postedAt: Date;
  applicants: Application[];
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  userName: string;
  userEmail: string;
  coverLetter: string;
  appliedAt: Date;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
}

interface JobsContextType {
  jobs: Job[];
  savedJobs: string[];
  myApplications: Application[];
  addJob: (job: Omit<Job, 'id' | 'postedAt' | 'applicants'>) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  applyToJob: (jobId: string, userId: string, userName: string, userEmail: string, coverLetter: string) => void;
  toggleSaveJob: (jobId: string) => void;
  getJobById: (id: string) => Job | undefined;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: '$120,000 - $180,000',
    description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building and maintaining our web applications using React and TypeScript.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    postedBy: 'employer@techcorp.com',
    postedAt: new Date(Date.now() - 86400000 * 2),
    applicants: [],
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    location: 'New York, NY',
    type: 'full-time',
    salary: '$130,000 - $170,000',
    description: 'Join our backend team to build scalable APIs and microservices. Experience with Node.js and PostgreSQL required.',
    skills: ['Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    postedBy: 'hr@dataflow.com',
    postedAt: new Date(Date.now() - 86400000 * 5),
    applicants: [],
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Creative Studios',
    location: 'Remote',
    type: 'remote',
    salary: '$90,000 - $130,000',
    description: 'Design beautiful and intuitive user interfaces for our clients. Must have experience with Figma and design systems.',
    skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
    postedBy: 'jobs@creativestudios.com',
    postedAt: new Date(Date.now() - 86400000 * 1),
    applicants: [],
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudNative Inc.',
    location: 'Austin, TX',
    type: 'full-time',
    salary: '$140,000 - $190,000',
    description: 'Manage our cloud infrastructure and CI/CD pipelines. Experience with Kubernetes and Terraform is a must.',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD'],
    postedBy: 'careers@cloudnative.com',
    postedAt: new Date(Date.now() - 86400000 * 3),
    applicants: [],
  },
  {
    id: '5',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'Seattle, WA',
    type: 'full-time',
    salary: '$110,000 - $160,000',
    description: 'Lead product strategy and work with cross-functional teams to deliver amazing products.',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research'],
    postedBy: 'pm@innovatetech.com',
    postedAt: new Date(Date.now() - 86400000 * 7),
    applicants: [],
  },
];

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [myApplications, setMyApplications] = useState<Application[]>([]);

  const addJob = (jobData: Omit<Job, 'id' | 'postedAt' | 'applicants'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      postedAt: new Date(),
      applicants: [],
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const updateJob = (id: string, jobData: Partial<Job>) => {
    setJobs(prev => prev.map(job => job.id === id ? { ...job, ...jobData } : job));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const applyToJob = (jobId: string, userId: string, userName: string, userEmail: string, coverLetter: string) => {
    const application: Application = {
      id: Date.now().toString(),
      jobId,
      userId,
      userName,
      userEmail,
      coverLetter,
      appliedAt: new Date(),
      status: 'pending',
    };
    
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, applicants: [...job.applicants, application] }
        : job
    ));
    
    setMyApplications(prev => [...prev, application]);
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getJobById = (id: string) => jobs.find(job => job.id === id);

  return (
    <JobsContext.Provider value={{
      jobs,
      savedJobs,
      myApplications,
      addJob,
      updateJob,
      deleteJob,
      applyToJob,
      toggleSaveJob,
      getJobById,
    }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) throw new Error('useJobs must be used within JobsProvider');
  return context;
};
