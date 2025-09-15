// src/mocks/handlers/assessments.handlers.ts
import { http, HttpResponse } from "msw"
import { db } from "../../db/dexieDB"
import { simulateLatency, shouldSimulateError } from "../../utils/simulate"
import type { Assessment, AssessmentResponse, Question } from "../../types/models"

// ------------------- Payload Types -------------------

interface AssessmentPayload {
  id?: string
  title: string
  description: string
  jobId?: string
  questions?: Question[]       // optional in payload; will default to []
  [key: string]: unknown      // allow extra fields if needed
}

interface AssessmentSubmitPayload {
  candidateId: string
  assessmentId: string
  answers: Record<string, unknown>
}

// ------------------- Handlers -------------------

export const assessmentHandlers = [
  // GET all assessments
  http.get("/api/assessments", async () => {
    await simulateLatency()
    const all: Assessment[] = await db.assessments.toArray()
    return HttpResponse.json(all, { status: 200 })
  }),

  // GET assessments by jobId
  http.get("/api/assessments/:jobId", async ({ params }) => {
    await simulateLatency()
    const jobId = params.jobId as string
    const rows: Assessment[] = await db.assessments.where({ jobId }).toArray()
    return HttpResponse.json(rows, { status: 200 })
  }),

  // PUT save/update assessment for jobId
  http.put("/api/assessments/:jobId", async ({ params, request }) => {
    await simulateLatency()
    if (shouldSimulateError()) {
      return HttpResponse.json({ error: "Simulated failure" }, { status: 500 })
    }

    const jobId = params.jobId as string
    const json = await request.json()
    if (!json) {
      return HttpResponse.json({ error: "Missing payload" }, { status: 400 })
    }

    const payload: AssessmentPayload = json as AssessmentPayload

    payload.jobId = jobId
    if (!payload.id) payload.id = crypto.randomUUID()
    if (!payload.questions) payload.questions = []  // ensure required field

    await db.assessments.put(payload as Assessment) // cast safe after ensuring required fields
    const stored = await db.assessments.get(payload.id)
    return HttpResponse.json(stored, { status: 200 })
  }),

  // POST submit assessment responses
  http.post("/api/assessments/:jobId/submit", async ({ params, request }) => {
    await simulateLatency()
    if (shouldSimulateError()) {
      return HttpResponse.json({ error: "Simulated failure" }, { status: 500 })
    }

    const jobId = params.jobId as string
    const json = await request.json()
    if (!json) {
      return HttpResponse.json({ error: "Missing payload" }, { status: 400 })
    }

    const payload: AssessmentSubmitPayload = json as AssessmentSubmitPayload
    const id = crypto.randomUUID()

    const response: AssessmentResponse = {
      id,
      jobId,
      candidateId: payload.candidateId,
      assessmentId: payload.assessmentId,
      answers: payload.answers,
      submittedAt: new Date().toISOString(),
    }

    await db.assessmentResponses.add(response)
    return HttpResponse.json({ success: true }, { status: 201 })
  }),
]
