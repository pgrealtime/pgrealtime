import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
