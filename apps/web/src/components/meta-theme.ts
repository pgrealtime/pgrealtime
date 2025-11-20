import { useEffect } from "react"
import { isIOS26 } from "@/lib/utils"

export function MetaTheme() {
  useEffect(() => {
    // Skip MetaTheme hook for iOS 26 (uses page reloads instead)
    if (isIOS26()) return

    const updateThemeColor = () => {
      // Skip MetaTheme hook for iOS 26 (uses page reloads instead)
      if (isIOS26()) return

      const bgColor = window.getComputedStyle(
        document.documentElement
      ).backgroundColor

      const metaThemeColor = document.querySelector("meta[name=theme-color]")

      metaThemeColor?.setAttribute("content", bgColor)
    }

    const observer = new MutationObserver(updateThemeColor)

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    })

    return () => observer.disconnect()
  }, [])

  return null
}
