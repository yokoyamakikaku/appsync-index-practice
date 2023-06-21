"use client"

import { FC } from 'react'
import Link from "next/link"
import { Flex, useTheme } from "@aws-amplify/ui-react"

const Navigation:FC = () => {
  const { tokens: { space }} = useTheme()
  return (
    <Flex direction="row" padding={space.medium}>
      <Link href="/queries/byGroup">byGroup</Link>
      <Link href="/queries/byGroupWithStatusQuery">byGroupWithStatusQuery</Link>
      <Link href="/queries/byGroupWithStatusAndYearAndMonth">byGroupWithStatusAndYearAndMonth</Link>
      <Link href="/queries/byGroupWithStatusAndYearAndMonthAndDay">byGroupWithStatusAndYearAndMonthAndDay</Link>
    </Flex>
  )
}

export default Navigation
