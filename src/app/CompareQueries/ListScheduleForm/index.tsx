"use client"

import { FC } from "react"
import { useForm } from "react-hook-form"
import {
  Button,
  Flex,
  TextField,
  View,
  useTheme,
  SelectField,
} from "@aws-amplify/ui-react"

import { ScheduleStatus } from "@/API"
import { ListSchedulesVariables } from "../api/types"
import { getDefaultValues } from "./utilities"

type ListScheduleFormProps = {
  onSubmit: ((variables: ListSchedulesVariables) => void)
  defaultValues?: Partial<ListSchedulesVariables>;
}

const ListScheduleForm: FC<ListScheduleFormProps> = ({ onSubmit, defaultValues }) => {
  const { tokens: { space } } = useTheme()

  const { handleSubmit, register } = useForm<ListSchedulesVariables>({
    async defaultValues() {
      return {
        ...getDefaultValues(),
        ...(defaultValues ?? {})
      }
    }
  })

  return (
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
      </form>
    </View>
  )
}

export default ListScheduleForm
