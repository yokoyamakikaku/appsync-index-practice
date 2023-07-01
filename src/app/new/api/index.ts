import * as dateFns from 'date-fns'
import { API, graphqlOperation } from '@aws-amplify/api'
import { GraphQLResult } from "@aws-amplify/api-graphql"
import {
  Schedule,
  CreateScheduleMutation,
  CreateScheduleMutationVariables,
} from '@/API'
import * as mutations from '@/graphql/mutations'

import { BulkCreateScheduleVariables, CreateScheduleVariables } from './types'
import { getCreateInputForIndex } from './utilities'

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

export  async function bulkCreateSchedule (variables: BulkCreateScheduleVariables) {
  const variablesSets: CreateScheduleVariables[] = []

  const { count, name, finishedDate, startedDate, status, group } = variables
  const rangeStartedAt = new Date(startedDate)
  const duration = new Date(finishedDate).getTime() - rangeStartedAt.getTime()
  for (let i = 0; i < count; i++) {
    const startedAt = (
      dateFns.set(new Date(Math.floor(rangeStartedAt.getTime() + Math.random() * duration)), { minutes: 0 })
    )
    const finishedAt = dateFns.add(startedAt, { hours: 1 })

    variablesSets.push({
      group, name, status,
      startedAt: startedAt.toISOString(),
      finishedAt: finishedAt.toISOString(),
      ...getCreateInputForIndex(startedAt.toISOString())
    })
  }

  return await Promise.all(variablesSets.map(createSchedule))
}
