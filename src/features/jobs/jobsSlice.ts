import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

interface JobsState {
  jobs: Job[];
}

const initialState: JobsState = {
  jobs: [],
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) state.jobs[index] = action.payload;
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    },
  },
});

export const { addJob, updateJob, deleteJob } = jobsSlice.actions;
export default jobsSlice.reducer;
