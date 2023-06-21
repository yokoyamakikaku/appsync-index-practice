"use client"

import { FC } from "react";
import Link from "next/link";
import { Flex } from "@aws-amplify/ui-react";

const ListQueries: FC = () => {
  return (
    <Flex direction="column">
      <Link href="/queries/byGroup">byGroup</Link>
      <Link href="/queries/byGroupWithStatusQuery">byGroupWithStatusQuery</Link>
      <Link href="/queries/byGroupWithStatusAndYearAndMonth">byGroupWithStatusAndYearAndMonth</Link>
      <Link href="/queries/byGroupWithStatusAndYearAndMonthAndDay">byGroupWithStatusAndYearAndMonthAndDay</Link>
    </Flex>
  )
}

export default ListQueries
