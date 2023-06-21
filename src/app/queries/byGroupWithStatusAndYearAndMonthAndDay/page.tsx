"use client"
import { format } from 'date-fns'
import { FC, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
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

import { ScheduleStatus } from "@/API"

import { listAllSchedulesByGroupWithStatusAndYearAndMonthAndDay } from '@/app/api'
import ListSchedulesPerformance from '@/app/ListSchedulesPerformance'
import { ListSchedulesVariables } from '@/app/api/types'
import { getResultAndPerformance } from '@/app/ListSchedulesPerformance/utilities'

type FormValues = ListSchedulesVariables

const defaultValues: FormValues = {
  group: 'Group',
  status: ScheduleStatus.ACTIVE,
  startedDate: format(new Date(), 'yyyy-MM-dd'),
  finishedDate: format(new Date(), 'yyyy-MM-dd'),
}

const ByGroupWithStatusAndYearAndMonthAndDay: FC = () => {
  const { tokens: { space } } = useTheme()

  const [listSchedulesVariables, setListSchedulesVariables] = useState<ListSchedulesVariables | null>(null)

  const { register, handleSubmit } = useForm<FormValues>({ defaultValues })
  const onSubmit = (values: FormValues) => {
    setListSchedulesVariables(values)
  }

  const listAllSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery = useQuery({
    queryKey: ['schdules', 'byGroupWithStatusAndYearAndMonthAndDay', listSchedulesVariables],
    enabled: listSchedulesVariables !== null,
    queryFn: async () => await getResultAndPerformance(() => listAllSchedulesByGroupWithStatusAndYearAndMonthAndDay(listSchedulesVariables as ListSchedulesVariables)),
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
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
            title="listAllSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery"
            query={listAllSchedulesByGroupWithStatusAndYearAndMonthAndDayQuery} />
        </View>
      )}
    </View>
  )
}

export default ByGroupWithStatusAndYearAndMonthAndDay
