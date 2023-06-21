import { View, Heading, useTheme } from "@aws-amplify/ui-react"
import { FC } from "react"

const AuthenticatorHeader: FC = () => {
  const { tokens: { space} } = useTheme()
  return (
    <View paddingBlock={space.medium}>
      <Heading level={3} textAlign="center">
        日付インデックスの検証
      </Heading>
    </View>
  )
}

export default AuthenticatorHeader
