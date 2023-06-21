import Providers from "./Providers"

export const metadata = {
  title: '日付インデックス',
  description: '日付でインデックスされたデータの操作の検証',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
