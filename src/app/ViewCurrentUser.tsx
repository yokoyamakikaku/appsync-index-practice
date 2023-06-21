"use client"

import { FC } from "react";
import { View,useAuthenticator, Flex, useTheme, Badge, Text, Divider } from "@aws-amplify/ui-react";

const ViewCurrentUser: FC = () => {
  const { authStatus, user } = useAuthenticator()
  const { tokens } = useTheme()
  return (
    <View marginBlockEnd={tokens.space.medium}>
      <Flex marginBlockEnd={tokens.space.small} columnGap={tokens.space.xs} alignItems="center">
        <Badge
          variation={
            authStatus === "authenticated" ? 'success' : (
              authStatus === "unauthenticated" ? 'error' : (
                'info'
                ))}>
          {authStatus}
        </Badge>
        {user && <Text whiteSpace="pre" fontFamily="monospace">{user.username}</Text>}
      </Flex>
      <Divider />
    </View>
  )
}

export default ViewCurrentUser
