import { ScheduleStatus } from "@/API"

export interface ListSchedulesVariables {
  group: string
  status: ScheduleStatus
  startedDate: string
  finishedDate: string
}

export interface YearAndMonthSet {
  year: string
  month: string
}

export interface YearAndMonthAndDaySet {
  year: string
  month: string
  day: string
}
