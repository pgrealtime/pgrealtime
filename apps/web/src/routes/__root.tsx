/// <reference types="vite/client" />

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
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "TanStack Start Starter"
      }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  component: RootComponent
})

function RootComponent() {
  return (
    <RootDocument>
      <Providers>
        <Outlet />
      </Providers>
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
        <Header />

        {children}
        <Scripts />
      </body>
    </html>
  )
}
