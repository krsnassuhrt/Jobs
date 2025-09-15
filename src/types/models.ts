// src/types/models.ts
import { ReactNode } from "react"

export type Job = {
  createdAt: string | number | Date
  id: string
  title: string
  description?: string
  status: "active" | "archived"
  tags?: string[]
  createAt?: string
  slug?: string
  order?: number
}

export type Candidate = {
  id: string
  name: string
  role?: string
  appliedRole: ReactNode
  bio?: string
  email?: string
  phone?: string
  status?: string
}

export type Assessment = {
  id: string
  title: string
  description: string
  questions: string[]
  jobId?: string
}

// --- NEW: Added missing Question type definition ---
// Based on the Assessment type, a Question is simply a string.
export type Question = string

// --- NEW: Added missing AssessmentResponse type definition ---
// This shape is derived from its usage in the assessment submission handler.
export type AssessmentResponse = {
  id: string
  jobId: string
  candidateId: string
  assessmentId: string
  answers: Record<string, unknown>
  submittedAt: string
}