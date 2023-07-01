import { useQuery } from "@tanstack/react-query";
import { ListSchedulesVariables } from "./api/types";
import { listAllSchedules, listAllSchedulesByGroup, listAllSchedulesByGroupWithStatus, listAllSchedulesByGroupWithStatusAndYearAndMonth,  listAllSchedulesByGroupWithStatusAndYearAndMonthAndDay, } from "./api";
import { useState } from "react";
import { getQueryResult } from "./utilities";

export function useCompareQueries () {
  const [variables,setVariables] = useState<ListSchedulesVariables|null>(null)
  const enabled = variables !== null
  const queryKey = [variables]

  const listAllSchedulesQuery = useQuery({
    enabled, queryKey,
    queryFn: () => listAllSchedules(variables as ListSchedulesVariables)
  })
  const listAllSchedulesByGroupQuery = useQuery({
    enabled, queryKey,
    queryFn: () => listAllSchedulesByGroup(variables as ListSchedulesVariables)
  })
  const listAllSchedulesByGroupWithStatusQuery = useQuery({
    enabled, queryKey,
    queryFn: () => listAllSchedulesByGroupWithStatus(variables as ListSchedulesVariables)
  })
  const listAllSchedulesByGroupWithStatusAndYearAndMonthQuery = useQuery({
    enabled, queryKey,
    queryFn: () => listAllSchedulesByGroupWithStatusAndYearAndMonth(variables as ListSchedulesVariables)
  })
  const listAllSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery = useQuery({
    enabled, queryKey,
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
    ] : null
  }
}
