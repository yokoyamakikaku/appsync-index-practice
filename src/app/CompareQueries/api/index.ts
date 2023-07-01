import { API, graphqlOperation } from '@aws-amplify/api'
import { GraphQLResult } from "@aws-amplify/api-graphql"
import {
  Schedule,
  ListSchedulesByGroupQuery,
  ListSchedulesByGroupQueryVariables,
  ListSchedulesQuery,
  ListSchedulesQueryVariables,
  ListSchedulesByGroupWithStatusQueryVariables,
  ListSchedulesByGroupWithStatusQuery,
  ListSchedulesByGroupWithStatusAndYearAndMonthQueryVariables,
  ListSchedulesByGroupWithStatusAndYearAndMonthQuery,
  ListSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery,
  ListSchedulesByGroupWithStatusAndYearAndMonthAndDayQueryVariables,
} from '@/API'
import * as queries from '@/graphql/queries'

import { ListScheduleIdsByGroupWithStatusQuery, ListSchedulesVariables } from './types'
import { devideDateString, getDateRange } from './utilities'
import { DEFAULT_LIMIT } from './constants'
import { listScheduleIdsByGroupWithStatus } from './queries'

async function recursiveCallApi <Result extends GraphQLResult, TData extends unknown> (
  call: (nextToken?: string) => Promise<Result>,
  getItemsAndNextToken: (result: Result) => ({ items: TData[], nextToken?: string }),
  nextToken?: string,
  startedAt?: number
) : Promise<{
  startedAt: number
  finishedAt: number
  items: TData[][]
}> {
  startedAt = startedAt ??  Date.now()

  const result = await call(nextToken)
  if (result.errors) throw result.errors

  const data = getItemsAndNextToken(result)
  if (!data.nextToken) {
    return {
      startedAt: startedAt,
      finishedAt: Date.now(),
      items: [data.items]
    }
  }
  const nextResult = await recursiveCallApi(call, getItemsAndNextToken, data.nextToken, startedAt)

  return {
    startedAt: startedAt ?? Date.now(),
    finishedAt: nextResult.finishedAt,
    items: [data.items, ...nextResult.items]
  }
}

export async function listAllSchedules (variables: ListSchedulesVariables) {
  const [startedAt, finishedAt] = getDateRange(variables.startedDate, variables.finishedDate)

  const queryVariables: ListSchedulesQueryVariables = {
    limit: DEFAULT_LIMIT,
    filter: {
      and: [
        {group: { eq: variables.group }},
        {status: { eq: variables.status }},
        {startedAt: { between: [startedAt, finishedAt] }},
      ]
    }
  }

  return await recursiveCallApi<GraphQLResult<ListSchedulesQuery>, Schedule>(
    async (nextToken) => {
      return await API.graphql(
        graphqlOperation(queries.listSchedules, { ...queryVariables, nextToken } as ListSchedulesQueryVariables)
      ) as GraphQLResult<ListSchedulesQuery>
    },
    (result) => {
      const items = result.data?.listSchedules?.items as Schedule[]
      const nextToken = result.data?.listSchedules?.nextToken ?? undefined
      return { items, nextToken }
    }
  )
}

export async function listAllSchedulesByGroup (variables: ListSchedulesVariables) {
  const [startedAt, finishedAt] = getDateRange(variables.startedDate, variables.finishedDate)

  const queryVariables: ListSchedulesByGroupQueryVariables = {
    limit: DEFAULT_LIMIT,
    group: variables.group,
    filter: {
      status: { eq: variables.status },
      startedAt: { between: [startedAt, finishedAt] }
    }
  }

  return await recursiveCallApi<GraphQLResult<ListSchedulesByGroupQuery>, Schedule>(
    async (nextToken) => {
      return await API.graphql(
        graphqlOperation(queries.listSchedulesByGroup, { ...queryVariables, nextToken } as ListSchedulesByGroupQueryVariables)
      ) as GraphQLResult<ListSchedulesByGroupQuery>
    },
    (result) => {
      const items = result.data?.listSchedulesByGroup?.items as Schedule[]
      const nextToken = result.data?.listSchedulesByGroup?.nextToken ?? undefined
      return { items, nextToken }
    }
  )
}

export async function listAllSchedulesByGroupWithStatus (variables: ListSchedulesVariables) {
  const [startedAt, finishedAt] = getDateRange(variables.startedDate, variables.finishedDate)

  const queryVariables: ListSchedulesByGroupWithStatusQueryVariables = {
    limit: DEFAULT_LIMIT,
    group: variables.group,
    status: { eq: variables.status },
    filter: { startedAt: { between: [startedAt, finishedAt] } }
  }

  return await recursiveCallApi<GraphQLResult<ListSchedulesByGroupWithStatusQuery>, Schedule>(
    async (nextToken) => {
      return await API.graphql(
        graphqlOperation(queries.listSchedulesByGroupWithStatus, { ...queryVariables, nextToken } as ListSchedulesByGroupWithStatusQueryVariables)
      ) as GraphQLResult<ListSchedulesByGroupWithStatusQuery>
    },
    (result) => {
      const items = result.data?.listSchedulesByGroupWithStatus?.items as Schedule[]
      const nextToken = result.data?.listSchedulesByGroupWithStatus?.nextToken ?? undefined
      return { items, nextToken }
    }
  )
}

export async function listAllSchedulesByGroupWithStatusAndYearAndMonth (variables: ListSchedulesVariables) {
  const [startedAt, finishedAt] = getDateRange(variables.startedDate, variables.finishedDate)

  const { year: startedYear, month: startedMonth } = devideDateString(startedAt)
  const { year: finishedYear, month: finishedMonth } = devideDateString(finishedAt)

  const queryVariables: ListSchedulesByGroupWithStatusAndYearAndMonthQueryVariables = {
    limit: DEFAULT_LIMIT,
    group: variables.group,
    statusStartedYearStartedMonth: {
      between: [{
        status: variables.status,
        startedYear: startedYear,
        startedMonth: startedMonth,
      }, {
        status: variables.status,
        startedYear: finishedYear,
        startedMonth: finishedMonth,
      }]
    },
    filter: { startedAt: { between: [startedAt, finishedAt] } }
  }

  return await recursiveCallApi<GraphQLResult<ListSchedulesByGroupWithStatusAndYearAndMonthQuery>, Schedule>(
    async (nextToken) => {
      return await API.graphql(
        graphqlOperation(queries.listSchedulesByGroupWithStatusAndYearAndMonth, { ...queryVariables, nextToken } as ListSchedulesByGroupWithStatusAndYearAndMonthQueryVariables)
      ) as GraphQLResult<ListSchedulesByGroupWithStatusAndYearAndMonthQuery>
    },
    (result) => {
      const items = result.data?.listSchedulesByGroupWithStatusAndYearAndMonth?.items as Schedule[]
      const nextToken = result.data?.listSchedulesByGroupWithStatusAndYearAndMonth?.nextToken ?? undefined
      return { items, nextToken }
    }
  )
}

export async function listAllSchedulesByGroupWithStatusAndYearAndMonthAndDay (variables: ListSchedulesVariables) {
  const [startedAt, finishedAt] = getDateRange(variables.startedDate, variables.finishedDate)

  const { year: startedYear, month: startedMonth, day: startedDay } = devideDateString(startedAt)
  const { year: finishedYear, month: finishedMonth, day: finishedDay } = devideDateString(finishedAt)
  const queryVariables: ListSchedulesByGroupWithStatusAndYearAndMonthAndDayQueryVariables = {
    limit: DEFAULT_LIMIT,
    group: variables.group,
    filter: { startedAt: { between: [startedAt, finishedAt] } },
    statusStartedYearStartedMonthStartedDay: {
      between: [{
        status: variables.status,
        startedYear: startedYear,
        startedMonth: startedMonth,
        startedDay: startedDay
      }, {
        status: variables.status,
        startedYear: finishedYear,
        startedMonth: finishedMonth,
        startedDay: finishedDay
      }]
    },
  }

  return await recursiveCallApi<GraphQLResult<ListSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery>, Schedule>(
    async (nextToken) => {
      return await API.graphql(
        graphqlOperation(queries.listSchedulesByGroupWithStatusAndYearAndMonthAndDay, { ...queryVariables, nextToken } as ListSchedulesByGroupWithStatusAndYearAndMonthAndDayQueryVariables)
      ) as GraphQLResult<ListSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery>
    },
    (result) => {
      const items = result.data?.listSchedulesByGroupWithStatusAndYearAndMonthAndDay?.items as Schedule[]
      const nextToken = result.data?.listSchedulesByGroupWithStatusAndYearAndMonthAndDay?.nextToken ?? undefined
      return { items, nextToken }
    }
  )
}

export async function listAllScheduleIdsByGroupWithStatus (variables: ListSchedulesVariables) {
  const [startedAt, finishedAt] = getDateRange(variables.startedDate, variables.finishedDate)

  const queryVariables: ListSchedulesByGroupWithStatusQueryVariables = {
    limit: DEFAULT_LIMIT,
    group: variables.group,
    status: { eq: variables.status },
    filter: { startedAt: { between: [startedAt, finishedAt] } }
  }

  return await recursiveCallApi<GraphQLResult<ListScheduleIdsByGroupWithStatusQuery>, Pick<Schedule, 'id'>>(
    async (nextToken) => {
      return await API.graphql(
        graphqlOperation(listScheduleIdsByGroupWithStatus, { ...queryVariables, nextToken } as ListSchedulesByGroupWithStatusQueryVariables)
      ) as GraphQLResult<ListScheduleIdsByGroupWithStatusQuery>
    },
    (result) => {
      const items = result.data?.listSchedulesByGroupWithStatus?.items as Schedule[]
      const nextToken = result.data?.listSchedulesByGroupWithStatus?.nextToken ?? undefined
      return { items, nextToken }
    }
  )
}
