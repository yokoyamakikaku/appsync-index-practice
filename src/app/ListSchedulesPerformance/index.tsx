"use client"

import { FC } from "react"
import { View, useTheme, Heading, Table, TableBody, TableRow, TableCell, Alert } from "@aws-amplify/ui-react"
import { UseQueryResult } from "@tanstack/react-query"
import { SchedulesAndPerformance } from "./types"

interface ListSchedulesPerformanceProps {
  title: string
  query: UseQueryResult<SchedulesAndPerformance>
}

const ListSchedulesPerformance: FC<ListSchedulesPerformanceProps> = ({
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

export default ListSchedulesPerformance
