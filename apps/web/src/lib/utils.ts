import { UAParser } from "ua-parser-js"
import { BrowserName, OSName } from "ua-parser-js/enums"

export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export function getiOSVersion(ua?: string) {
  const parser = new UAParser(ua)
  const browser = parser.getBrowser()
  const os = parser.getOS()

  if (os.name !== OSName.IOS) {
    return null
  }

  if (
    browser.name === BrowserName.SAFARI_MOBILE &&
    browser.major === "26" &&
    os.name === OSName.IOS &&
    os.version === "18.6"
  ) {
    return "26"
  } else {
    return os.version ?? null
  }
}

export function isIOS26() {
  return getiOSVersion() === "26"
}
