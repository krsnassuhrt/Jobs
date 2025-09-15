import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Job, Candidate, Assessment } from "../types/models"

// RTK Query API slice
export const rtkApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // 👈 all requests hit /api/*
  tagTypes: ["Jobs", "Candidates", "Assessments"],
  endpoints: (builder) => ({
    // ========================
    // Jobs
    // ========================
    getJobs: builder.query<
      { data: Job[]; total: number },
      { search?: string; status?: string; page?: number; pageSize?: number }
      >({
      query: ({ search = "", status = "", page = 1, pageSize = 5 }) =>
        `jobs?search=${search}&status=${status}&page=${page}&pageSize=${pageSize}`,
      providesTags: ["Jobs"],
    }),

    createJob: builder.mutation<Job, Partial<Job>>({
      query: (body) => ({
        url: "jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),

    updateJob: builder.mutation<Job, { id: string; updates: Partial<Job> }>({
      query: ({ id, updates }) => ({
        url: `jobs/${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["Jobs"],
    }),

    reorderJobs: builder.mutation<{ success: boolean }, string[]>({
    query: (orderedIds) => ({
    url: "jobs/reorder",
    method: "PATCH",
    body: { orderedIds },
    }),
    invalidatesTags: ["Jobs"],
    }),


    // ========================
    // Candidates
    // ========================
    getCandidates: builder.query<Candidate[], void>({
      query: () => "candidates",
      providesTags: ["Candidates"],
    }),

    // (later: add createCandidate, updateCandidate, moveCandidateStage etc.)
    // ========================
    // Assessments
    // ========================
    getAssessments: builder.query<Assessment[], void>({
      query: () => "assessments",
      providesTags: ["Assessments"],
    }),

    createAssessment: builder.mutation<Assessment, Partial<Assessment>>({
      query: (newAssesment) => ({
        url: "assessments",
        method: "POST",
        body:newAssesment,
      }),
      invalidatesTags: ["Assessments"],
    }),
  }),
})

// Export hooks
export const {
  // Jobs
  useGetJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useReorderJobsMutation,
  // Candidates
  useGetCandidatesQuery,

  // Assessments
  useGetAssessmentsQuery,
  useCreateAssessmentMutation,
} = rtkApi
