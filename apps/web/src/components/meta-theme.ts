import { useEffect } from "react"

/**
 * Component that synchronizes the theme-color meta tag with the current CSS background color.
 *
 * Observes changes to the document element's class attribute (used for theme switching)
 * and updates the theme-color meta tag to match the computed background color.
 * This ensures the browser's UI (e.g., status bar on mobile) matches the app's theme.
 *
 * @returns null (this component doesn't render any UI)
 */
export function MetaTheme() {
  useEffect(() => {
    const themeChanged = () => {
      const bgColor = window.getComputedStyle(
        document.documentElement
      ).backgroundColor

      const metaThemeColor = document.querySelector("meta[name=theme-color]")

      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", bgColor)
      } else {
        const meta = document.createElement("meta")
        meta.name = "theme-color"
        meta.content = bgColor
        document.head.appendChild(meta)
      }
    }

    const observer = new MutationObserver(themeChanged)

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    })

    return () => observer.disconnect()
  }, [])

  return null
}
