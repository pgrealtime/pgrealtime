import { AuthProvider } from "@better-auth-ui/heroui"
import {
  CloseIcon,
  DangerIcon,
  InfoIcon,
  Spinner,
  SuccessIcon,
  WarningIcon
} from "@heroui/react"
import { Link, useRouter } from "@tanstack/react-router"
import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"
import { Toaster } from "sonner"
import { authClient } from "@/lib/auth-client"
import { MetaTheme } from "./meta-theme"

/**
 * Root provider component that wraps the application with theme and toast notifications.
 *
 * Sets up:
 * - ThemeProvider for dark/light mode switching
 * - Toaster with custom icons and styling for notifications
 * - MetaTheme component for theme-color meta tag synchronization
 *
 * @param props - Component props
 * @param props.children - Child components to wrap with providers
 * @returns A React element containing the providers and children
 */
export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <AuthProvider
        authClient={authClient}
        socialProviders={["github"]}
        navigate={(to) => router.navigate({ to })}
        replace={(to) => router.navigate({ to, replace: true })}
        Link={({ href, children, className }) => (
          <Link to={href} className={className}>
            {children as ReactNode}
          </Link>
        )}
      >
        {children}
      </AuthProvider>

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
