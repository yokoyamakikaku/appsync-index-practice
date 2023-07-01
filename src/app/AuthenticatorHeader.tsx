import { View, Heading, useTheme } from "@aws-amplify/ui-react"

const AuthenticatorHeader = () => {
  const { tokens: { space} } = useTheme()
  return (
    <View paddingBlock={space.large}>
      <Heading level={4} textAlign="center">
        日付インデックスの検証
      </Heading>
    </View>
  )
}

export default AuthenticatorHeader
