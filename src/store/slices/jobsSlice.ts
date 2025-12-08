import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Application } from '../api/jobsApi';

interface JobsState {
  savedJobs: string[];
  myApplications: Application[];
}

const initialState: JobsState = {
  savedJobs: [],
  myApplications: [],
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    toggleSaveJob: (state, action: PayloadAction<string>) => {
      const jobId = action.payload;
      const index = state.savedJobs.indexOf(jobId);
      if (index !== -1) {
        state.savedJobs.splice(index, 1);
      } else {
        state.savedJobs.push(jobId);
      }
    },
    addApplication: (state, action: PayloadAction<Application>) => {
      state.myApplications.push(action.payload);
    },
    clearUserData: (state) => {
      state.savedJobs = [];
      state.myApplications = [];
    },
  },
});

export const { toggleSaveJob, addApplication, clearUserData } = jobsSlice.actions;
export default jobsSlice.reducer;
