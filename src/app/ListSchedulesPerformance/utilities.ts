import { format } from "date-fns"
import { Schedule } from "@/API"
import { SchedulesAndPerformance } from "./types"

export const getResultAndPerformance = async(
  listSchedules: () => Promise<Schedule[]>,
) => {
  const startedAt = new Date()
  const schedules = await listSchedules()
  const finishedAt = new Date()
  const executionTime = finishedAt.getTime() - startedAt.getTime()
  return {
    schedules,
    startedAtLabel: format(startedAt, 'yyyy-MM-dd HH:mm:ss'),
    finishedAtLabel: format(finishedAt, 'yyyy-MM-dd HH:mm:ss'),
    executionTimeLabel: `${executionTime}ms`
  } as SchedulesAndPerformance
}
