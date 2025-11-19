/// <reference types="vite/client" />
import ubuntuSansFont from "@fontsource-variable/ubuntu-sans/files/ubuntu-sans-latin-wght-normal.woff2?url"
import ubuntuSansMonoFont from "@fontsource-variable/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-wght-normal.woff2?url"
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts
} from "@tanstack/react-router"
import type { ReactNode } from "react"
import { Header } from "../components/header"
import { Providers } from "../components/providers"
import appCss from "../styles/app.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover"
      },
      {
        title: "TanStack Start Starter"
      }
    ],
    links: [
      {
        rel: "preload",
        href: ubuntuSansFont,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous"
      },
      {
        rel: "preload",
        href: ubuntuSansMonoFont,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous"
      },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  component: RootComponent
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />

          {children}
        </Providers>
        <Scripts />
      </body>
    </html>
  )
}
