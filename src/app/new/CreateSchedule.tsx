"use client"

import { FC } from "react"
import { GraphQLError } from "graphql"
import { format, set, add } from 'date-fns'
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Button, TextField, View, useTheme, SelectField, Flex, Heading, Divider, Alert } from "@aws-amplify/ui-react"

import { Schedule, ScheduleStatus } from "@/API"
import { createSchedule } from "./api"
import { CreateScheduleVariables } from "./api/types"

type FormValues = {
  name: string
  group: string
  status: ScheduleStatus
  date: string
  startedTime: string
  finishedTime: string
}

const defaultValues: FormValues = {
  name: 'Schedule',
  group: 'Group',
  status: ScheduleStatus.ACTIVE,
  date: format(new Date(), 'yyyy-MM-dd'),
  startedTime: format(set(new Date(), { minutes: 0 }), 'HH:mm'),
  finishedTime: format(add(set(new Date(), { minutes: 0 }), { hours: 1 }), 'HH:mm'),
}

const CreateSchedule: FC = () => {
  const { tokens: { space } } = useTheme()

  const mutation = useMutation<Schedule, GraphQLError, CreateScheduleVariables>({
    mutationFn: createSchedule
  })

  const { register, handleSubmit } = useForm<FormValues>({ defaultValues })
  const onSubmit = (values: FormValues) => {
    const {date, finishedTime,group,startedTime,status , name } = values
    const startedAt = new Date(`${date} ${startedTime}`).toISOString()
    const finishedAt = new Date(`${date} ${finishedTime}`).toISOString()
    mutation.mutate({ group, name, status, finishedAt, startedAt })
  }

  return (
    <View marginBlockEnd={space.large}>
      <Heading level={4} marginBlockEnd={space.medium}>予定の作成</Heading>
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
              <TextField type="date" label="日付" {...register("date")} />
              <TextField type="time" label="開始時刻" {...register("startedTime")} />
              <TextField type="time" label="終了時刻" {...register("finishedTime")} />
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

export default CreateSchedule
