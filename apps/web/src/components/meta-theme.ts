import { useEffect } from "react"
import { isIOS } from "@/lib/utils"

export function MetaTheme() {
  useEffect(() => {
    if (isIOS()) return

    const updateThemeColor = () => {
      if (isIOS()) return

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
