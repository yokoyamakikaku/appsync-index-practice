import { API, graphqlOperation } from '@aws-amplify/api'
import { GraphQLResult } from "@aws-amplify/api-graphql"
import { format } from 'date-fns'

import {
  ListSchedulesQuery,
  ListSchedulesQueryVariables,
  ListSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHourQuery,
  ListSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHourQueryVariables,
  ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyConditionInput,
  Schedule,
  ScheduleStatus
} from '@/API'
import * as queries from '@/graphql/queries'
import { endOfDay, startOfDay } from 'date-fns'

export interface QueryRequest {
  group: string
  status: ScheduleStatus
  startedDate: string
  finishedDate: string
}

export async function listSchedules (request: QueryRequest) {
  const rangeStart = startOfDay(new Date(request.startedDate)).toISOString()
  const rangeEnd = endOfDay(new Date(request.finishedDate)).toISOString()

  const schedules:Schedule[] = []
  let nextToken: string | null | undefined
  let requestCount = 0
  do {
    const result = await API.graphql(
      graphqlOperation(queries.listSchedules, {
        nextToken,
        filter: {
          and: [
            { group: { eq: request.group } },
            { status: { eq: request.status } },
            { startedAt: { gt: rangeStart } },
            { startedAt: { lt: rangeEnd } },
          ]
        }
      } as ListSchedulesQueryVariables)
    ) as GraphQLResult<ListSchedulesQuery>
    requestCount += 1
    if (requestCount > 20) throw Error("Time out")
    if (result.errors) throw result.errors
    if (!result.data) throw Error('no data')

    for(const item of result.data.listSchedules?.items ?? []) {
      if (!item) continue
      schedules.push(item)
    }
    nextToken = result.data.listSchedules?.nextToken
  } while (!!nextToken)

  return schedules
}

export function getDividedISODateString (date: Date) {
  const isoString = date.toISOString()
  const match = isoString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z/)
  if (!match) throw Error("Invalid Date")
  return {
    year: match[1],
    month: match[2],
    date: match[3],
    hour: match[4],
    minute: match[5],
    second: match[6],
    millsecond: match[7],
  }
}

export async function listSchedulesByGroupWithStatusAndYearAndMonthAndDateAndHour (request: QueryRequest) {
  const condition: ModelScheduleByGroupWithStatusAndYearAndMonthAndDateAndHourCompositeKeyConditionInput = {}

  const rangeStartedAt = new Date(request.startedDate)
  const rangeFinishedAt = new Date(request.finishedDate)
  const rangeStart = startOfDay(rangeStartedAt).toISOString()
  const rangeEnd = endOfDay(rangeFinishedAt).toISOString()
  const rangeStartString = getDividedISODateString(rangeStartedAt)
  const rangeFinishString = getDividedISODateString(rangeFinishedAt)

  condition.eq = { status: request.status }

  if (rangeStartString.year === rangeFinishString.year) condition.eq.startedYear = rangeStartString.year
  if (rangeStartString.month === rangeFinishString.month) condition.eq.startedMonth = rangeStartString.month
  if (rangeStartString.date === rangeFinishString.date) condition.eq.startedMonth = rangeStartString.date
  if (rangeStartString.hour === rangeFinishString.hour) condition.eq.startedHour = rangeStartString.hour

  const schedules:Schedule[] = []
  let nextToken: string | null | undefined
  let requestCount = 0
  do {
    const result = await API.graphql(
      graphqlOperation(queries.listSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHour, {
        nextToken,
        group: request.group,
        statusStartedYearStartedMonthStartedDateStartedHour: condition,
        filter: {
          and: [
            { startedAt: { gt: rangeStart } },
            { startedAt: { lt: rangeEnd } },
          ]
        }
      } as ListSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHourQueryVariables)
    ) as GraphQLResult<ListSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHourQuery>
    requestCount += 1
    if (requestCount > 20) throw Error("Time out")
    if (result.errors) throw result.errors
    if (!result.data) throw Error('no data')

    for(const item of result.data.listSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHour?.items ?? []) {
      if (!item) continue
      schedules.push(item)
    }
    nextToken = result.data.listSchedulesbyGroupWithStatusAndYearAndMonthAndDateAndHour?.nextToken
  } while (!!nextToken)

  return schedules
}
