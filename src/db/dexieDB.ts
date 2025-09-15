// src/db/dexieDB.ts
import Dexie, { Table } from "dexie"
import type { Job, Candidate, Assessment } from "../types/models"

export interface CandidateTimelineEntry {
  id?: number
  candidateId: string
  from?: string | null
  to: string
  note?: string | null
  ts: string
}

export interface AssessmentResponse {
  id?: string
  jobId?: string
  candidateId?: string
  assessmentId?: string
  answers: Record<string, unknown> // 👈 no 'any'
  submittedAt: string
}

export class AppDB extends Dexie {
  jobs!: Table<Job, string>
  candidates!: Table<Candidate, string>
  assessments!: Table<Assessment, string>
  candidateTimeline!: Table<CandidateTimelineEntry, number>
  assessmentResponses!: Table<AssessmentResponse, string>

  constructor() {
    super("talentflow_db")
    this.version(1).stores({
      jobs: "id, title, status, createdAt, order, slug",
      candidates: "id, name, role, status",
      assessments: "id, title, description", // ✅ added description for indexing
      candidateTimeline: "++id, candidateId, ts",
      assessmentResponses: "id, jobId, candidateId, assessmentId, submittedAt",
    })
  }
}

export const db = new AppDB()

// ✅ Seed database if empty
export async function seedIfEmpty({
  seedJobs,
  seedCandidates,
  seedAssessments,
}: {
  seedJobs: Job[]
  seedCandidates: Candidate[]
  seedAssessments: Assessment[]
}) {
  const jobsCount = await db.jobs.count()
  if (jobsCount === 0) {
    await db.transaction("rw", [db.jobs, db.candidates, db.assessments], async () => {
      await db.jobs.bulkAdd(seedJobs)
      await db.candidates.bulkAdd(seedCandidates)
      await db.assessments.bulkAdd(seedAssessments)
    })
  }
}

// ✅ Export full DB contents
export async function exportDb() {
  const [jobs, candidates, assessments, timeline, responses] = await Promise.all([
    db.jobs.toArray(),
    db.candidates.toArray(),
    db.assessments.toArray(),
    db.candidateTimeline.toArray(),
    db.assessmentResponses.toArray(),
  ])
  return { jobs, candidates, assessments, timeline, responses }
}

// ✅ Import payload into DB
export async function importDb(payload: {
  jobs?: Job[]
  candidates?: Candidate[]
  assessments?: Assessment[]
  timeline?: CandidateTimelineEntry[]
  responses?: AssessmentResponse[]
}) {
  await db.transaction(
    "rw",
    [db.jobs, db.candidates, db.assessments, db.candidateTimeline, db.assessmentResponses],
    async () => {
      if (payload.jobs?.length) await db.jobs.bulkPut(payload.jobs)
      if (payload.candidates?.length) await db.candidates.bulkPut(payload.candidates)
      if (payload.assessments?.length) await db.assessments.bulkPut(payload.assessments)
      if (payload.timeline?.length) await db.candidateTimeline.bulkPut(payload.timeline)
      if (payload.responses?.length) await db.assessmentResponses.bulkPut(payload.responses)
    }
  )
}

// ✅ Clear all tables
export async function clearDb() {
  await db.transaction(
    "rw",
    [db.jobs, db.candidates, db.assessments, db.candidateTimeline, db.assessmentResponses],
    async () => {
      await db.jobs.clear()
      await db.candidates.clear()
      await db.assessments.clear()
      await db.candidateTimeline.clear()
      await db.assessmentResponses.clear()
    }
  )
}
