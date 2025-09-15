// scripts/seedLarge.js (node)
const fs = require("fs")
const { faker } = require("@faker-js/faker")
const { v4: uuidv4 } = require("uuid")

function generate() {
  const jobs = []
  const candidates = []
  const assessments = []

  for (let i = 0; i < 25; i++) {
    jobs.push({
      id: uuidv4(),
      title: faker.name.jobTitle(),
      description: faker.lorem.sentence(),
      status: Math.random() > 0.3 ? "active" : "archived",
      tags: ["react", "node"].slice(0, Math.floor(Math.random() * 2) + 1),
      createdAt: new Date().toISOString(),
    })
  }

  for (let i = 0; i < 2000; i++) {
    const job = jobs[Math.floor(Math.random() * jobs.length)]
    candidates.push({
      id: uuidv4(),
      name: faker.person.fullName(),
      role: job.title,
      bio: faker.lorem.sentences(2),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      status: ["applied", "interview", "offer"][Math.floor(Math.random() * 3)],
    })
  }

  for (let i = 0; i < 5; i++) {
    assessments.push({
      id: uuidv4(),
      title: `Auto Assessment ${i + 1}`,
      description: faker.lorem.sentence(),
      questions: Array.from({ length: 10 }, () => faker.lorem.sentence()),
    })
  }

  fs.writeFileSync("large-seed.json", JSON.stringify({ jobs, candidates, assessments }, null, 2))
  console.log("large-seed.json created")
}

generate()
