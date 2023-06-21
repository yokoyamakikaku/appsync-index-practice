import { API, graphqlOperation } from '@aws-amplify/api'
import { GraphQLResult } from "@aws-amplify/api-graphql"
import {
  Schedule,
  CreateScheduleMutation,
  CreateScheduleMutationVariables,
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
import * as mutations from '@/graphql/mutations'

import { CreateScheduleVariables, ListSchedulesVariables } from './types'
import { getCreateInputForIndex, getDateRange, getYearAndMonthAndDaySetsFromDateRange, getYearAndMonthSetsFromDateRange } from './utilities'

export async function createSchedule (variables: CreateScheduleVariables) {
  const result = await API.graphql(
    graphqlOperation(mutations.createSchedule, {
      input: {
        group: variables.group,
        name: variables.name,
        status: variables.status,
        startedAt: variables.startedAt,
        finishedAt: variables.finishedAt,
        ...getCreateInputForIndex(variables.startedAt)
      }
    } as CreateScheduleMutationVariables)
  ) as GraphQLResult<CreateScheduleMutation>
  if (result.errors) throw result.errors
  if (!result.data) throw Error('no data')
  return result.data?.createSchedule as Schedule
}

export async function listAllSchedules (variables: ListSchedulesVariables) {
  const [
    startedAt,
    finishedAt,
  ] = getDateRange(variables.startedDate, variables.finishedDate)

  const queryVariables: ListSchedulesQueryVariables = {
    filter: {
      group: { eq: variables.group },
      status: { eq: variables.status },
      startedAt: { gt: startedAt, lt: finishedAt }
    }
  }

  const schedules:Schedule[] = []
  let nextToken: string | null | undefined
  do {
    const result = await API.graphql(
      graphqlOperation(queries.listSchedules, { ...queryVariables, nextToken } as ListSchedulesQueryVariables)
    ) as GraphQLResult<ListSchedulesQuery>

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

export async function listAllSchedulesByGroup (variables: ListSchedulesVariables) {
  const [startedAt, finishedAt] = getDateRange(variables.startedDate, variables.finishedDate)

  const queryVariables: ListSchedulesByGroupQueryVariables = {
    group: variables.group,
    filter: {
      status: { eq: variables.status },
      startedAt: { gt: startedAt, lt: finishedAt }
    }
  }

  const schedules:Schedule[] = []
  let nextToken: string | null | undefined
  do {
    const result = await API.graphql(
      graphqlOperation(queries.listSchedulesByGroup, { ...queryVariables, nextToken } as ListSchedulesByGroupQueryVariables)
    ) as GraphQLResult<ListSchedulesByGroupQuery>

    if (result.errors) throw result.errors
    if (!result.data) throw Error('no data')

    for(const item of result.data.listSchedulesByGroup?.items ?? []) {
      if (!item) continue
      schedules.push(item)
    }
    nextToken = result.data.listSchedulesByGroup?.nextToken
  } while (!!nextToken)

  return schedules
}

export async function listAllSchedulesByGroupWithStatus (variables: ListSchedulesVariables) {
  const [startedAt, finishedAt] = getDateRange(variables.startedDate, variables.finishedDate)

  const schedules:Schedule[] = []

  const queryVariables: ListSchedulesByGroupWithStatusQueryVariables = {
    group: variables.group,
    status: { eq: variables.status },
    filter: { startedAt: { gt: startedAt, lt: finishedAt } }
  }

  let nextToken: string | null | undefined
  do {
    const result = await API.graphql(
      graphqlOperation(queries.listSchedulesByGroupWithStatus, {
        ...queryVariables,
        nextToken
      } as ListSchedulesByGroupWithStatusQueryVariables)
    ) as GraphQLResult<ListSchedulesByGroupWithStatusQuery>

    if (result.errors) throw result.errors
    if (!result.data) throw Error('no data')

    for(const item of result.data.listSchedulesByGroupWithStatus?.items ?? []) {
      if (!item) continue
      schedules.push(item)
    }
    nextToken = result.data.listSchedulesByGroupWithStatus?.nextToken
  } while (!!nextToken)

  return schedules
}

export async function listAllSchedulesByGroupWithStatusAndYearAndMonth (variables: ListSchedulesVariables) {
  const [startedAt, finishedAt] = getDateRange(variables.startedDate, variables.finishedDate)

  const schedules:Schedule[] = []

  const yearAndMonthSets = getYearAndMonthSetsFromDateRange([ startedAt, finishedAt ])
  const queryVariables: ListSchedulesByGroupWithStatusAndYearAndMonthQueryVariables = {
    group: variables.group,
    filter: { startedAt: { gt: startedAt, lt: finishedAt } }
  }
  for (const { year, month } of yearAndMonthSets) {
    let nextToken: string | null | undefined
    do {
      const result = await API.graphql(
        graphqlOperation(queries.listSchedules, {
          ...queryVariables,
          statusStartedYearStartedMonth: {
            eq: {
              status: variables.status,
              startedYear: year,
              startedMonth: month
            }
          },
          nextToken
        } as ListSchedulesByGroupWithStatusAndYearAndMonthQueryVariables)
      ) as GraphQLResult<ListSchedulesByGroupWithStatusAndYearAndMonthQuery>

      if (result.errors) throw result.errors
      if (!result.data) throw Error('no data')

      for(const item of result.data.listSchedulesByGroupWithStatusAndYearAndMonth?.items ?? []) {
        if (!item) continue
        schedules.push(item)
      }
      nextToken = result.data.listSchedulesByGroupWithStatusAndYearAndMonth?.nextToken
    } while (!!nextToken)
  }

  return schedules
}

export async function listAllSchedulesByGroupWithStatusAndYearAndMonthAndDay (variables: ListSchedulesVariables) {
  const [startedAt, finishedAt] = getDateRange(variables.startedDate, variables.finishedDate)

  const schedules:Schedule[] = []

  const yearAndMonthAndDaySets = getYearAndMonthAndDaySetsFromDateRange([ startedAt, finishedAt ])
  const queryVariables: ListSchedulesByGroupWithStatusAndYearAndMonthAndDayQueryVariables = {
    group: variables.group,
    filter: { startedAt: { gt: startedAt, lt: finishedAt } }
  }
  for (const { year, month, day } of yearAndMonthAndDaySets) {
    let nextToken: string | null | undefined
    do {
      const result = await API.graphql(
        graphqlOperation(queries.listSchedules, {
          ...queryVariables,
          statusStartedYearStartedMonth: {
            eq: {
              status: variables.status,
              startedYear: year,
              startedMonth: month,
              startedDay: day
            }
          },
          nextToken
        } as ListSchedulesByGroupWithStatusAndYearAndMonthAndDayQueryVariables)
      ) as GraphQLResult<ListSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery>

      if (result.errors) throw result.errors
      if (!result.data) throw Error('no data')

      for(const item of result.data.listSchedulesByGroupWithStatusAndYearAndMonthAndDay?.items ?? []) {
        if (!item) continue
        schedules.push(item)
      }
      nextToken = result.data.listSchedulesByGroupWithStatusAndYearAndMonthAndDay?.nextToken
    } while (!!nextToken)
  }

  return schedules
}
