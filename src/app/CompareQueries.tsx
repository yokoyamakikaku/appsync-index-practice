"use client"

import { FC, useState } from "react"
import {
  Button,
  Divider,
  Flex,
  TextField,
  View,
  useTheme,
  SelectField,
  Heading,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@aws-amplify/ui-react"
import { useForm } from "react-hook-form"
import { format } from 'date-fns'
import { Schedule, ScheduleStatus } from "@/API"
import { useQuery } from "@tanstack/react-query"
import { SchedulesAndPerformance } from "./types"
import { ListSchedulesVariables } from "./api/types"
import { listAllSchedules, listAllSchedulesByGroup, listAllSchedulesByGroupWithStatus, listAllSchedulesByGroupWithStatusAndYearAndMonth, listAllSchedulesByGroupWithStatusAndYearAndMonthAndDay } from "./api"
import ListSchedulesPerformance from "./ListSchedulesPerformance"

type FormValues = ListSchedulesVariables

const defaultValues: FormValues = {
  group: 'Group',
  status: ScheduleStatus.ACTIVE,
  startedDate: format(new Date(), 'yyyy-MM-dd'),
  finishedDate: format(new Date(), 'yyyy-MM-dd'),
}

const getResultAndPerformance = async(
  listSchedules: () => Promise<Schedule[]>,
) => {
  const startedAt = new Date()
  const schedules = await listSchedules()
  const finishedAt = new Date()
  const executionTime = finishedAt.getTime() - startedAt.getTime()
  return {
    schedules,
    startedAtLabel: format(startedAt, 'yyyy-MM-dd HH:mm:ss'),
    finishedAtLabel: format(finishedAt, 'yyyy-MM-dd HH:mm:ss'),
    executionTimeLabel: `${executionTime}ms`
  } as SchedulesAndPerformance
}

const CompareQueries: FC = () => {
  const { tokens: { space } } = useTheme()

  const [listSchedulesVariables, setListSchedulesVariables] = useState<ListSchedulesVariables | null>(null)

  const { register, handleSubmit } = useForm<FormValues>({ defaultValues })
  const onSubmit = (values: FormValues) => {
    setListSchedulesVariables(values)
  }

  const listAllSchedulesQuery = useQuery({
    queryKey: ['schdules', listSchedulesVariables],
    enabled: listSchedulesVariables !== null,
    queryFn: async () =>  await getResultAndPerformance(() => listAllSchedules(listSchedulesVariables as ListSchedulesVariables))
  })

  const listAllSchedulesByGroupQuery = useQuery({
    queryKey: ['schdules', 'byGroup', listSchedulesVariables],
    enabled: listSchedulesVariables !== null,
    queryFn: async () =>  await getResultAndPerformance(() => listAllSchedulesByGroup(listSchedulesVariables as ListSchedulesVariables))
  })

  const listAllSchedulesByGroupWithStatusQuery = useQuery({
    queryKey: ['schdules', 'byGroupWithStatus', listSchedulesVariables],
    enabled: listSchedulesVariables !== null,
    queryFn: async () =>  await getResultAndPerformance(() => listAllSchedulesByGroupWithStatus(listSchedulesVariables as ListSchedulesVariables))
  })

  const listAllSchedulesByGroupWithStatusAndYearAndMonthQuery = useQuery({
    queryKey: ['schdules', 'ByGroupWithStatusAndYearAndMonthQuery', listSchedulesVariables],
    enabled: listSchedulesVariables !== null,
    queryFn: async () =>  await getResultAndPerformance(() => listAllSchedulesByGroupWithStatusAndYearAndMonth(listSchedulesVariables as ListSchedulesVariables))
  })

  const listAllSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery = useQuery({
    queryKey: ['schdules', 'ByGroupWithStatusAndYearAndMonthAndDateAndDayQuery', listSchedulesVariables],
    enabled: listSchedulesVariables !== null,
    queryFn: async () =>  await getResultAndPerformance(() => listAllSchedulesByGroupWithStatusAndYearAndMonthAndDay(listSchedulesVariables as ListSchedulesVariables))
  })

  return (
    <View>
      <Heading level={4} marginBlockEnd={space.medium}>動作速度の検証</Heading>
      <View marginBlockEnd={space.large}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex alignItems="end" wrap={"wrap"} marginBlockEnd={space.medium}>
            <TextField type="text" label="グループ" {...register("group")} />
            <SelectField label="状態" {...register("status")}>
              <option value={ScheduleStatus.ACTIVE}>{ScheduleStatus.ACTIVE}</option>
              <option value={ScheduleStatus.DISACTIVE}>{ScheduleStatus.DISACTIVE}</option>
            </SelectField>
            <TextField type="date" label="開始日" {...register("startedDate")} />
            <TextField type="date" label="終了日" {...register("finishedDate")} />
            <Button type="submit" variation="primary">取得する</Button>
          </Flex>
          <Divider />
        </form>
      </View>
      {listSchedulesVariables && (
        <View>
          <View marginBlockEnd={space.medium}>
            <Heading level={4} marginBlockEnd={space.small}>リクエスト</Heading>
            <Table>
              <TableBody>
                {Object.entries(listSchedulesVariables).map(([key,value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </View>
          <ListSchedulesPerformance
            title="listAllSchedulesQuery"
            query={listAllSchedulesQuery} />
          <ListSchedulesPerformance
            title="listAllSchedulesByGroupQuery"
            query={listAllSchedulesByGroupQuery} />
          <ListSchedulesPerformance
            title="listAllSchedulesByGroupWithStatusQuery"
            query={listAllSchedulesByGroupWithStatusQuery} />
          <ListSchedulesPerformance
            title="listAllSchedulesByGroupWithStatusAndYearAndMonthQuery"
            query={listAllSchedulesByGroupWithStatusAndYearAndMonthQuery} />
          <ListSchedulesPerformance
            title="listAllSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery"
            query={listAllSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery} />
        </View>
      )}
    </View>
  )
}

export default CompareQueries
