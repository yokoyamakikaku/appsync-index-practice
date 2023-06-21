"use client"

import { View, useTheme } from "@aws-amplify/ui-react";
import { FC, PropsWithChildren } from "react";

const Container:FC<PropsWithChildren> = ({ children }) => {
  const {
    breakpoints,
    tokens
  } = useTheme()
  return (
    <View
      maxWidth={breakpoints.values.xl}
      padding={tokens.space.large}>
      {children}
    </View>
  )
}

export default Container
