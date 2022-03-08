import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{title || "myAppName"}</title>
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@563&display=swap"
          rel="stylesheet"
        />
        <link href="fonts/stylesheet.css" rel="stylesheet" />
      </Head>

      {children}
    </>
  )
}

export default Layout
