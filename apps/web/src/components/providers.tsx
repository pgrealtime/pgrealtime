import {
  CloseIcon,
  DangerIcon,
  InfoIcon,
  Spinner,
  SuccessIcon,
  WarningIcon
} from "@heroui/react"
import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"
import { Toaster } from "sonner"
import { MetaTheme } from "./meta-theme"

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      {children}

      <Toaster
        icons={{
          info: <InfoIcon />,
          close: <CloseIcon />,
          error: <DangerIcon />,
          success: <SuccessIcon />,
          warning: <WarningIcon />,
          loading: (
            <div className="flex">
              <Spinner size="sm" color="current" />
            </div>
          )
        }}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: "alert bg-overlay/90 backdrop-blur",
            default: "alert--default",
            info: "alert--accent",
            success: "alert--success",
            warning: "alert--warning",
            loading: "alert--accent",
            error: "alert--danger",
            icon: "alert__indicator",
            loader: "alert__indicator",
            content: "alert__content",
            title: "alert__title",
            description: "alert__description"
          }
        }}
      />

      <MetaTheme />
    </ThemeProvider>
  )
}
