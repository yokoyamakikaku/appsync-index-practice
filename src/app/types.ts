import { Schedule } from "@/API"

export interface SchedulesAndPerformance {
  schedules: Schedule[]
  startedAtLabel: string
  finishedAtLabel: string
  executionTimeLabel: string
}
