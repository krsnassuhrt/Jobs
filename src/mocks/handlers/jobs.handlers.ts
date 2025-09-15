// src/mocks/handlers/jobs.handlers.ts
import { http, HttpResponse } from "msw"
import { db } from "../../db/dexieDB"
import { simulateLatency, shouldSimulateError } from "../../utils/simulate"
import { slugify } from "../../utils/slug"
import type { Job } from "../../types/models"

interface JobPayload {
  id?: string
  title?: string
  description?: string
  status?: "active" | "archived"
  tags?: string[]
  createdAt?: string
}

interface ReorderPayload {
  orderedIds?: string[]
  fromOrder?: number
  toOrder?: number
}

export const jobsHandlers = [
  // ... (other handlers remain the same) ...
  http.get("/api/jobs", async ({ request }) => {
    await simulateLatency()
    const url = new URL(request.url)
    const search = url.searchParams.get("search")?.toLowerCase() ?? ""
    const status = url.searchParams.get("status") ?? ""
    const page = Number(url.searchParams.get("page") ?? 1)
    const pageSize = Number(url.searchParams.get("pageSize") ?? 10)
    const sort = url.searchParams.get("sort") ?? "order"

    let all = await db.jobs.toArray()

    if (search) {
      all = all.filter((j) => j.title.toLowerCase().includes(search) || (j.description || "").toLowerCase().includes(search))
    }
    if (status) {
      all = all.filter((j) => j.status === status)
    }

    if (sort === "createdAt") {
      all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else {
      all.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    }

    const total = all.length
    const start = (page - 1) * pageSize
    const data = all.slice(start, start + pageSize)

    return HttpResponse.json({ data, total }, { status: 200 })
  }),

  http.post("/api/jobs", async ({ request }) => {
    await simulateLatency()
    if (shouldSimulateError()) return HttpResponse.json({ error: "Simulated failure" }, { status: 500 })

    const payload = (await request.json()) as JobPayload
    const title = payload.title || "untitled"
    const baseSlug = slugify(title)
    let slug = baseSlug
    let i = 1
    while (await db.jobs.where("slug").equalsIgnoreCase(slug).first()) {
      slug = `${baseSlug}-${i++}`
    }

    const last = await db.jobs.orderBy("order").last()
    const order = (last?.order ?? -1) + 1

    const newJob: Job = {
      id: payload.id ?? crypto.randomUUID(),
      title,
      description: payload.description ?? "",
      status: payload.status ?? "active",
      tags: payload.tags ?? [],
      createdAt: payload.createdAt ?? new Date().toISOString(),
      slug,
      order,
    }

    await db.jobs.add(newJob)
    return HttpResponse.json(newJob, { status: 201 })
  }),

  http.patch("/api/jobs/:id", async ({ params, request }) => {
    await simulateLatency()
    if (shouldSimulateError()) return HttpResponse.json({ error: "Simulated failure" }, { status: 500 })

    const id = params.id as string
    const updates = (await request.json()) as Partial<Job>
    await db.jobs.update(id, updates)
    const updated = await db.jobs.get(id)
    if (!updated) return HttpResponse.json({ error: "Not found" }, { status: 404 })
    return HttpResponse.json(updated, { status: 200 })
  }),

  // PATCH reorder
  http.patch("/api/jobs/:id/reorder", async ({ request }) => {
    await simulateLatency()
    if (shouldSimulateError()) return HttpResponse.json({ error: "Simulated failure" }, { status: 500 })

    const body = (await request.json()) as ReorderPayload
    const all = await db.jobs.orderBy("order").toArray()
    let newOrderList = all.map((j) => j.id)

    if (Array.isArray(body.orderedIds)) {
      newOrderList = body.orderedIds
    } else if (typeof body.fromOrder === "number" && typeof body.toOrder === "number") {
      const arr = [...newOrderList]
      const [removed] = arr.splice(body.fromOrder, 1)
      arr.splice(body.toOrder, 0, removed)
      newOrderList = arr
    } else {
      return HttpResponse.json({ error: "Invalid body" }, { status: 400 })
    }

    const idToJobMap = new Map(all.map((job) => [job.id, job]))

    const reorderedJobs = newOrderList
      .map((id, idx) => {
        const job = idToJobMap.get(id as string)
        if (!job) return null
        return { ...job, order: idx }
      })
      // --- CORRECTED: Removed the 'is Job' predicate to let TS infer the type ---
      .filter((job) => job !== null)

    await db.transaction("rw", db.jobs, async () => {
      await db.jobs.clear()
      await db.jobs.bulkAdd(reorderedJobs as Job[]) // Cast here if needed, though often not necessary
    })

    return HttpResponse.json({ success: true }, { status: 200 })
  }),
]