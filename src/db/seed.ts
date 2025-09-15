// src/db/seed.ts
import { v4 as uuidv4 } from "uuid"
import { faker } from "@faker-js/faker"
import type { Job, Candidate, Assessment } from "../types/models"

export function generateLargeSeed(candidateCount = 1000) {
  const jobs: Job[] = []
  const candidates: Candidate[] = []
  const assessments: Assessment[] = []

  for (let i = 0; i < 25; i++) {
    const title = faker.person.jobTitle()
    jobs.push({
      id: uuidv4(),
      title,
      description: faker.lorem.sentence(),
      status: Math.random() > 0.3 ? "active" : "archived",
      tags: faker.helpers.arrayElements(["react", "node", "python", "devops", "golang"], 2),
      createAt: faker.date.past({ years: 1 }).toISOString(),
      slug: faker.helpers.slugify(title).toLowerCase(),
      order: i,
      createdAt: ""
    })
  }

  for (let i = 0; i < candidateCount; i++) {
    const job = jobs[Math.floor(Math.random() * jobs.length)]
    candidates.push({
      id: uuidv4(),
      name: faker.person.fullName(),
      role: job.title,
      appliedRole: job.title,
      bio: faker.lorem.sentences(2),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      status: faker.helpers.arrayElement([
        "applied",
        "screening",
        "interview",
        "offer",
        "hired",
      ]),
    })
  }

  for (let i = 0; i < 5; i++) {
    assessments.push({
      id: uuidv4(),
      title: `Auto Assessment ${i + 1}`,
      description: faker.lorem.sentence(),
      questions: Array.from({ length: 10 }, () => faker.lorem.sentence()),
      jobId: jobs[i % jobs.length].id,
    })
  }

  return { jobs, candidates, assessments }
}

// ✅ small seeds for quick demo
export const smallSeeds: {
  jobs: Job[]
  candidates: Candidate[]
  assessments: Assessment[]
} = (() => {
  const j: Job[] = [
    {
      id: uuidv4(),
      title: "Frontend Engineer",
      description: "React dev role",
      status: "active",
      tags: ["react"],
      createAt: new Date().toISOString(),
      slug: "frontend-engineer",
      order: 0,
      createdAt: ""
    },
    {
      id: uuidv4(),
      title: "Backend Engineer",
      description: "Node dev role",
      status: "archived",
      tags: ["node"],
      createAt: new Date().toISOString(),
      slug: "backend-engineer",
      order: 1,
      createdAt: ""
    },
  ]

  const c: Candidate[] = [
    {
      id: uuidv4(),
      name: "Alice Johnson",
      role: "Frontend Engineer",
      appliedRole: "Frontend Engineer",
      bio: "React dev",
      email: "alice@example.com",
      phone: "555-0101",
      status: "applied",
    },
    {
      id: uuidv4(),
      name: "Bob Smith",
      role: "Backend Engineer",
      appliedRole: "Backend Engineer",
      bio: "Node dev",
      email: "bob@example.com",
      phone: "555-0202",
      status: "interview",
    },
  ]

  const a: Assessment[] = [
    {
      id: uuidv4(),
      title: "React Basics Quiz",
      description: "Test React fundamentals",
      questions: ["What is JSX?"],
      jobId: j[0].id,
    },
    {
      id: uuidv4(),
      title: "Database Fundamentals",
      description: "Covers DB basics",
      questions: ["What is normalization?"],
      jobId: j[1].id,
    },
  ]

  return { jobs: j, candidates: c, assessments: a }
})()
