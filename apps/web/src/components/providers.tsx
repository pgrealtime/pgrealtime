import { Spinner } from "@heroui/react"
import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"
import { Toaster } from "sonner"

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
          loading: (
            <div className="flex">
              <Spinner size="sm" color="current" />
            </div>
          )
        }}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: "alert shadow dark:border dark:border-surface-secondary",
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
    </ThemeProvider>
  )
}
