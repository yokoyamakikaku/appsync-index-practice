"use client"

import { FC, useState } from "react"
import { Button, Divider, Flex, TextField, View, useTheme, Text, SelectField, Heading, Table, TableBody, TableRow, TableCell, Alert } from "@aws-amplify/ui-react"
import { useForm } from "react-hook-form"
import { format } from 'date-fns'
import { Schedule, ScheduleStatus } from "@/API"
import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { QueryRequest, listSchedules, listSchedulesByGroupWithStatusAndYearAndMonthAndDateAndHour } from "./api"

type FormValues = {
  group: string
  status: ScheduleStatus
  startedDate: string
  finishedDate: string
}

const defaultValues: FormValues = {
  group: 'Group',
  status: ScheduleStatus.ACTIVE,
  startedDate: format(new Date(), 'yyyy-MM-dd'),
  finishedDate: format(new Date(), 'yyyy-MM-dd'),
}

type SchedulesAndPerformance = {
  schedules: Schedule[]
  startedAtLabel: string
  finishedAtLabel: string
  executionTimeLabel: string
}

interface QueryResultProps {
  title: string
  query: UseQueryResult<SchedulesAndPerformance>
}

const QueryResult: FC<QueryResultProps> = ({
  title,
  query
}) => {
  const { tokens: { space } } = useTheme()

  return (
    <View marginBlockEnd={space.medium}>
      <Heading level={4} marginBlockEnd={space.small}>{title}</Heading>
      {query.isLoading && <Alert variation="info">読み込み中</Alert>}
      {query.isError && <Alert variation="error">エラー</Alert>}
      {query.isSuccess && (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>件数</TableCell>
              <TableCell>{query.data.schedules.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>実行時間</TableCell>
              <TableCell>{query.data.executionTimeLabel}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>取得開始</TableCell>
              <TableCell>{query.data.startedAtLabel}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>取得完了</TableCell>
              <TableCell>{query.data.finishedAtLabel}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </View>
  )
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

  const [queryRequest, setQueryRequest] = useState<QueryRequest | null>(null)

  const { register, handleSubmit } = useForm<FormValues>({ defaultValues })
  const onSubmit = (values: FormValues) => {
    setQueryRequest(values)
  }

  const listSchedulesQuery = useQuery({
    queryKey: ['schdules', queryRequest],
    enabled: queryRequest !== null,
    async queryFn () {
      return await getResultAndPerformance(() => listSchedules(queryRequest as QueryRequest))
    }
  })


  const listSchedulesByGroupWithStatusAndYearAndMonthAndDateAndHourQuery = useQuery({
    queryKey: ['schdules', 'index', queryRequest],
    enabled: queryRequest !== null,
    async queryFn () {
      return await getResultAndPerformance(() => listSchedulesByGroupWithStatusAndYearAndMonthAndDateAndHour(queryRequest as QueryRequest))
    }
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
      {queryRequest && (
        <View>
          <View marginBlockEnd={space.medium}>
            <Heading level={4} marginBlockEnd={space.small}>リクエスト</Heading>
            <Table>
              <TableBody>
                {Object.entries(queryRequest).map(([key,value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>
                      {key === "requestStartedAt" ? (
                        <Text>{format(new Date(value), 'yyyy-MM-dd HH:mm:ss')}</Text>
                        ) : (
                        <Text>{value}</Text>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </View>
          <QueryResult title="listSchedulesQuery" query={listSchedulesQuery} />
          <QueryResult title="listSchedulesByGroupWithStatusAndYearAndMonthAndDateAndHourQuery" query={listSchedulesByGroupWithStatusAndYearAndMonthAndDateAndHourQuery} />
        </View>
      )}
    </View>
  )
}

export default CompareQueries
