"use client"
import { FC } from "react"
import {
  View,
  useTheme,
  Heading,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@aws-amplify/ui-react"

import ListScheduleForm from './ListScheduleForm'
import { useCompareQueries } from './hooks'

const CompareQueries: FC = () => {
  const { tokens: { space } } = useTheme()
  const { execute, queryResults } = useCompareQueries()

  return (
    <View>
      <Heading level={4} marginBlockEnd={space.medium}>動作速度の検証</Heading>
      <ListScheduleForm onSubmit={execute} />
      {queryResults && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>クエリ名</TableCell>
              <TableCell>リクエスト回数</TableCell>
              <TableCell>取得件数</TableCell>
              <TableCell>所要時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queryResults.map(result => (
              <TableRow key={result.name}>
                <TableCell>{result.name}</TableCell>
                <TableCell>{result.requestCount}</TableCell>
                <TableCell>{result.itemCount}</TableCell>
                <TableCell>{result.elapsedTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </View>
  )
}

export default CompareQueries
