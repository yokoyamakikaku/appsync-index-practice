// export interface QueryRequest {
//   group: string
//   status: ScheduleStatus
//   startedDate: string
//   finishedDate: string
// }

// import { API, graphqlOperation } from '@aws-amplify/api'
// import { GraphQLResult } from "@aws-amplify/api-graphql"

// import {
//   ListSchedulesQuery,
//   ListSchedulesQueryVariables,
//   ListSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHourQuery,
//   ListSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHourQueryVariables,
//   ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyConditionInput,
//   Schedule,
//   ScheduleStatus
// } from '@/API'
// import * as queries from '@/graphql/queries'
// import { endOfDay, startOfDay } from 'date-fns'

import { ScheduleStatus } from "@/API"

export interface CreateScheduleVariables {
  name: string
  group: string
  status: ScheduleStatus
  startedAt: string
  finishedAt: string
}

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
