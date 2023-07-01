import { useQuery } from "@tanstack/react-query";
import { ListSchedulesVariables } from "./api/types";
import {
  listAllSchedules,
  listAllSchedulesByGroup,
  listAllSchedulesByGroupWithStatus,
  listAllSchedulesByGroupWithStatusAndYearAndMonth,
  listAllSchedulesByGroupWithStatusAndYearAndMonthAndDay,
  listAllScheduleIdsByGroupWithStatus
} from "./api";
import { useState } from "react";
import { getQueryResult } from "./utilities";

export function useCompareQueries () {
  const [variables,setVariables] = useState<ListSchedulesVariables|null>(null)
  const enabled = variables !== null

  const listAllSchedulesQuery = useQuery({
    enabled, queryKey: ["listAllSchedulesQuery", variables],
    queryFn: () => listAllSchedules(variables as ListSchedulesVariables)
  })
  const listAllSchedulesByGroupQuery = useQuery({
    enabled, queryKey: ["listAllSchedulesByGroupQuery", variables],
    queryFn: () => listAllSchedulesByGroup(variables as ListSchedulesVariables)
  })
  const listAllSchedulesByGroupWithStatusQuery = useQuery({
    enabled, queryKey: ["listAllSchedulesByGroupWithStatusQuery", variables],
    queryFn: () => listAllSchedulesByGroupWithStatus(variables as ListSchedulesVariables)
  })
  const listAllScheduleIdsByGroupWithStatusQuery = useQuery({
    enabled, queryKey: ["listAllScheduleIdsByGroupWithStatusQuery", variables],
    queryFn: () => listAllScheduleIdsByGroupWithStatus(variables as ListSchedulesVariables)
  })
  const listAllSchedulesByGroupWithStatusAndYearAndMonthQuery = useQuery({
    enabled, queryKey: ["listAllSchedulesByGroupWithStatusAndYearAndMonthQuery", variables],
    queryFn: () => listAllSchedulesByGroupWithStatusAndYearAndMonth(variables as ListSchedulesVariables)
  })
  const listAllSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery = useQuery({
    enabled, queryKey: ["listAllSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery", variables],
    queryFn: () => listAllSchedulesByGroupWithStatusAndYearAndMonthAndDay(variables as ListSchedulesVariables)
  })

  return {
    execute: setVariables,
    queryResults: variables ? [
      getQueryResult("listAllSchedulesQuery", listAllSchedulesQuery),
      getQueryResult("listAllSchedulesByGroupQuery", listAllSchedulesByGroupQuery),
      getQueryResult("listAllSchedulesByGroupWithStatusQuery", listAllSchedulesByGroupWithStatusQuery),
      getQueryResult("listAllSchedulesByGroupWithStatusAndYearAndMonthQuery", listAllSchedulesByGroupWithStatusAndYearAndMonthQuery),
      getQueryResult("listAllSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery", listAllSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery),
      getQueryResult("listAllScheduleIdsByGroupWithStatusQuery", listAllScheduleIdsByGroupWithStatusQuery),
    ] : null
  }
}
