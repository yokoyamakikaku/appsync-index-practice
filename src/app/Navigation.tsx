"use client"

import { FC } from 'react'
import Link from "next/link"
import { useTheme, Flex, Button } from "@aws-amplify/ui-react"

const Navigation:FC = () => {
  const { tokens: { space }} = useTheme()
  return (
    <Flex direction="row" paddingBlock={space.large} paddingInline={space.medium}>
      <Link href="/">
        <Button>比較</Button>
      </Link>
      <Link href="/new">
        <Button>作成</Button>
      </Link>
    </Flex>
  )
}

export default Navigation
