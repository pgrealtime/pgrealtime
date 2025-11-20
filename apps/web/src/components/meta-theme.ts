import { useEffect } from "react"

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
