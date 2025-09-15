import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: string[];
}

interface AssessmentsState {
  assessments: Assessment[];
}

const initialState: AssessmentsState = {
  assessments: [],
};

const assessmentsSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {
    addAssessment: (state, action: PayloadAction<Assessment>) => {
      state.assessments.push(action.payload);
    },
    updateAssessment: (state, action: PayloadAction<Assessment>) => {
      const index = state.assessments.findIndex(a => a.id === action.payload.id);
      if (index !== -1) state.assessments[index] = action.payload;
    },
    deleteAssessment: (state, action: PayloadAction<string>) => {
      state.assessments = state.assessments.filter(a => a.id !== action.payload);
    },
  },
});

export const { addAssessment, updateAssessment, deleteAssessment } = assessmentsSlice.actions;
export default assessmentsSlice.reducer;
