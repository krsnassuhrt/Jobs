// src/mocks/handlers/candidates.handlers.ts
import { http, HttpResponse } from "msw"
import { db } from "../../db/dexieDB"
import { simulateLatency, shouldSimulateError } from "../../utils/simulate"
import type { Candidate } from "../../types/models" // Assuming you have a Candidate type defined

// --- NEW: Define payload type to avoid using 'any' ---
interface CandidatePayload {
  id?: string
  name: string
  role?: string
  bio?: string
  email?: string
  phone?: string
  status?: "applied" | "screening" | "interview" | "offer" | "hired"
  note?: string
}


export const candidatesHandlers = [
  // GET all
  http.get("/api/candidates", async ({ request }) => {
    await simulateLatency()
    const url = new URL(request.url)
    const search = url.searchParams.get("search")?.toLowerCase() ?? ""
    const stage = url.searchParams.get("stage") ?? ""
    const page = Number(url.searchParams.get("page") ?? 1)
    const pageSize = Number(url.searchParams.get("pageSize") ?? 50)

    let all = await db.candidates.toArray()
    if (search) {
      all = all.filter(c => c.name.toLowerCase().includes(search) || (c.email || "").toLowerCase().includes(search))
    }
    if (stage) {
      all = all.filter(c => c.status === stage)
    }

    const total = all.length
    const start = (page - 1) * pageSize
    const data = all.slice(start, start + pageSize)
    return HttpResponse.json({ data, total }, { status: 200 })
  }),

  // POST create candidate
  http.post("/api/candidates", async ({ request }) => {
    await simulateLatency()
    if (shouldSimulateError()) return HttpResponse.json({ error: "Simulated failure" }, { status: 500 })

    // --- CORRECTED: Use the specific CandidatePayload type instead of 'any' ---
    const payload = (await request.json()) as CandidatePayload

    const newCandidate: Candidate = {
      id: payload.id ?? crypto.randomUUID(),
      name: payload.name,
      role: payload.role ?? "",
      // --- CORRECTED: Added the missing 'appliedRole' property ---
      appliedRole: payload.role ?? "",
      bio: payload.bio ?? "",
      email: payload.email ?? "",
      phone: payload.phone ?? "",
      status: payload.status ?? "applied",
    }
    await db.candidates.add(newCandidate)
    return HttpResponse.json(newCandidate, { status: 201 })
  }),

  // PATCH update candidate (and write timeline when status changes)
  http.patch("/api/candidates/:id", async ({ params, request }) => {
    await simulateLatency()
    if (shouldSimulateError()) return HttpResponse.json({ error: "Simulated failure" }, { status: 500 })

    const id = params.id as string
    // --- CORRECTED: Use a partial Candidate type instead of 'any' ---
    const updates = (await request.json()) as Partial<Candidate> & { note?: string }

    const before = await db.candidates.get(id)
    if (!before) return HttpResponse.json({ error: "Not found" }, { status: 404 })

    await db.candidates.update(id, updates)
    const updated = await db.candidates.get(id)

    // Check if status was updated and is different from the previous status
    if (updates.status && updates.status !== before.status) {
      await db.candidateTimeline.add({
        candidateId: id,
        from: before.status,
        to: updates.status,
        note: updates.note ?? null,
        ts: new Date().toISOString(),
      })
    }

    return HttpResponse.json(updated, { status: 200 })
  }),

  // GET candidate timeline
  http.get("/api/candidates/:id/timeline", async ({ params }) => {
    await simulateLatency()
    const id = params.id as string
    const entries = await db.candidateTimeline.where({ candidateId: id }).sortBy("ts")
    return HttpResponse.json(entries, { status: 200 })
  }),
]