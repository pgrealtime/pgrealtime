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

import { Header } from "@/components/header"
import { Providers } from "@/components/providers"
import appCss from "@/styles/app.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1"
      },
      {
        name: "mobile-web-app-capable",
        content: "yes"
      },
      {
        title: "pgrealtime"
      }
    ],
    links: [
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: ubuntuSansFont,
        crossOrigin: "anonymous"
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: ubuntuSansMonoFont,
        crossOrigin: "anonymous"
      },
      { rel: "stylesheet", href: appCss },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg"
      },
      { rel: "icon", sizes: "96x96", href: "/favicon-96x96.png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      { rel: "manifest", href: "/site.webmanifest" }
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
      <body>
        <Providers>
          <Header />

          {children}
        </Providers>
        <Scripts />
      </body>
    </html>
  )
}
