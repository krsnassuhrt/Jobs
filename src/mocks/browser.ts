// src/mocks/browser.ts
import { setupWorker } from "msw/browser"
import { assessmentHandlers } from "./handlers/assessments.handlers"
import { jobsHandlers } from "./handlers/jobs.handlers"
import { candidatesHandlers } from "./handlers/candidates.handlers"

export const worker = setupWorker(
  ...assessmentHandlers,
  ...jobsHandlers,
  ...candidatesHandlers
)

