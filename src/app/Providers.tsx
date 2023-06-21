"use client"

import { FC, PropsWithChildren } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

import { I18n, Amplify } from "aws-amplify"
import { translations } from '@aws-amplify/ui'
import { Authenticator } from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css';
import awsExports from '@/aws-exports'

import AuthenticatorHeader from "./AuthenticatorHeader"

Amplify.configure(awsExports)

I18n.putVocabularies(translations)
I18n.setLanguage('ja')

const client = new QueryClient ()

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={client}>
        <Authenticator components={{
          Header: AuthenticatorHeader
        }}>
          {children}
        </Authenticator>
      </QueryClientProvider>
    </>
  )
}

export default Providers
