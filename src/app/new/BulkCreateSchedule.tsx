"use client"

import { FC } from "react"
import { GraphQLError } from "graphql"
import { format, set } from 'date-fns'
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Button, TextField, View, useTheme, SelectField, Flex, Heading, Divider, Alert } from "@aws-amplify/ui-react"

import { Schedule, ScheduleStatus } from "@/API"
import { bulkCreateSchedule } from "./api"
import { BulkCreateScheduleVariables } from "./api/types"

type FormValues = {
  name: string
  group: string
  status: ScheduleStatus
  startedDate: string
  finishedDate: string
  count: number
}

const getDefaultValues = () => {
  const defaultValues: FormValues = {
    name: 'Schedule',
    group: 'Group',
    status: ScheduleStatus.ACTIVE,
    startedDate: format(set(new Date(), { month: 0, date: 1 }), 'yyyy-MM-dd'),
    finishedDate: format(set(new Date(), { month: 11, date: 31}), 'yyyy-MM-dd'),
    count: 10
  }
  return defaultValues
}

const BulkCreateSchedule: FC = () => {
  const { tokens: { space } } = useTheme()

  const mutation = useMutation<Schedule[], GraphQLError, BulkCreateScheduleVariables>({
    mutationFn: bulkCreateSchedule
  })

  const { register, handleSubmit } = useForm<FormValues>({ defaultValues: getDefaultValues() })
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values)
  }

  return (
    <View marginBlockEnd={space.large}>
      <Heading level={4} marginBlockEnd={space.medium}>予定の一括の作成</Heading>
      <Flex direction="column" marginBlockEnd={space.medium}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column">
            <Flex>
              <TextField type="text" label="名前" {...register("name")} />
              <TextField type="text" label="グループ" {...register("group")} />
              <SelectField label="状態" {...register("status")}>
                <option value={ScheduleStatus.ACTIVE}>{ScheduleStatus.ACTIVE}</option>
                <option value={ScheduleStatus.DISACTIVE}>{ScheduleStatus.DISACTIVE}</option>
              </SelectField>
            </Flex>
            <Flex>
              <TextField type="number" step={1} min={1} max={1000} label="作成する数" {...register("count")} />
              <TextField type="date" label="期間の開始" {...register("startedDate")} />
              <TextField type="date" label="期間の終了" {...register("finishedDate")} />
            </Flex>
            <Flex>
              <Button type="submit" variation="primary">作成する</Button>
            </Flex>
          </Flex>
        </form>
        {mutation.isError && <Alert variation="error">エラー</Alert>}
        {mutation.isLoading && <Alert variation="info">処理中</Alert>}
        {mutation.isSuccess && <Alert variation="success">作成しました</Alert>}
      </Flex>
      <Divider />
    </View>
  )
}

export default BulkCreateSchedule
