import { ScheduleStatus } from "@/API"

export interface CreateScheduleVariables {
  name: string
  group: string
  status: ScheduleStatus
  startedAt: string
  finishedAt: string
}

export interface BulkCreateScheduleVariables {
  name: string
  group: string
  status: ScheduleStatus
  count: number
  startedDate: string
  finishedDate: string
}
