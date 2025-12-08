import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

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
  postedAt: string;
  applicants: Application[];
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  userName: string;
  userEmail: string;
  coverLetter: string;
  appliedAt: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
}

// Mock data
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
    postedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
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
    postedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
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
    postedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
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
    postedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
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
    postedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    applicants: [],
  },
];

// Simulated delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// RTK Query API - structured for future backend integration
export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Jobs', 'Applications'],
  endpoints: (builder) => ({
    // Get all jobs
    getJobs: builder.query<Job[], void>({
      queryFn: async () => {
        await delay(300);
        // In production: return { data: await fetch('/api/jobs').then(r => r.json()) }
        return { data: mockJobs };
      },
      providesTags: ['Jobs'],
    }),

    // Get single job by ID
    getJobById: builder.query<Job | undefined, string>({
      queryFn: async (id) => {
        await delay(200);
        const job = mockJobs.find(j => j.id === id);
        return { data: job };
      },
      providesTags: (_result, _error, id) => [{ type: 'Jobs', id }],
    }),

    // Create a new job
    createJob: builder.mutation<Job, Omit<Job, 'id' | 'postedAt' | 'applicants'>>({
      queryFn: async (jobData) => {
        await delay(500);
        const newJob: Job = {
          ...jobData,
          id: Date.now().toString(),
          postedAt: new Date().toISOString(),
          applicants: [],
        };
        mockJobs.unshift(newJob);
        return { data: newJob };
      },
      invalidatesTags: ['Jobs'],
    }),

    // Update job
    updateJob: builder.mutation<Job, { id: string; data: Partial<Job> }>({
      queryFn: async ({ id, data }) => {
        await delay(300);
        const index = mockJobs.findIndex(j => j.id === id);
        if (index !== -1) {
          mockJobs[index] = { ...mockJobs[index], ...data };
          return { data: mockJobs[index] };
        }
        return { error: { status: 404, data: 'Job not found' } };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Jobs', id }, 'Jobs'],
    }),

    // Delete job
    deleteJob: builder.mutation<{ success: boolean }, string>({
      queryFn: async (id) => {
        await delay(300);
        const index = mockJobs.findIndex(j => j.id === id);
        if (index !== -1) {
          mockJobs.splice(index, 1);
          return { data: { success: true } };
        }
        return { error: { status: 404, data: 'Job not found' } };
      },
      invalidatesTags: ['Jobs'],
    }),

    // Apply to job
    applyToJob: builder.mutation<Application, { jobId: string; userId: string; userName: string; userEmail: string; coverLetter: string }>({
      queryFn: async ({ jobId, userId, userName, userEmail, coverLetter }) => {
        await delay(500);
        const application: Application = {
          id: Date.now().toString(),
          jobId,
          userId,
          userName,
          userEmail,
          coverLetter,
          appliedAt: new Date().toISOString(),
          status: 'pending',
        };
        const job = mockJobs.find(j => j.id === jobId);
        if (job) {
          job.applicants.push(application);
          return { data: application };
        }
        return { error: { status: 404, data: 'Job not found' } };
      },
      invalidatesTags: ['Jobs', 'Applications'],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useApplyToJobMutation,
} = jobsApi;
