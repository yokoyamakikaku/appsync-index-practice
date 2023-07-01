import { ScheduleStatus } from "@/API"

export interface FormValues {
  group: string
  status: ScheduleStatus
  startedDate: string
  finishedDate: string
}
