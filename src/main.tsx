import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { db, seedIfEmpty } from "./db/dexieDB"
import { generateLargeSeed,} from "./db/seed"

import { smallSeeds} from "./db/seed"

async function prepareApp() {
  await seedIfEmpty({
    seedJobs: smallSeeds.jobs,
    seedCandidates: smallSeeds.candidates,
    seedAssessments: smallSeeds.assessments,
  })
  const jobsCount = await db.jobs.count()
  if (jobsCount === 0) {
    // generate large
    const { jobs, candidates, assessments } = generateLargeSeed(1000)
    await seedIfEmpty({ seedJobs: jobs, seedCandidates: candidates, seedAssessments: assessments })
  }

  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mocks/browser")
    await worker.start({
      onUnhandledRequest: (req, print) => {
        if (req.url.includes("/api")) print.warning()
      },
    })
  }

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

prepareApp()
