import { PasswordChangedEmail as PasswordChangedTemplate } from "@better-auth-ui/heroui"
import { Font } from "@react-email/font"

export function PasswordChangedEmail({
  email,
  secureAccountURL,
  timestamp
}: {
  email?: string
  secureAccountURL?: string
  timestamp?: string
}) {
  return (
    <PasswordChangedTemplate
      email={email}
      supportEmail="support@pgrealtime.com"
      appName="pgrealtime"
      timestamp={timestamp}
      secureAccountURL={secureAccountURL}
      logoURL={{
        light: "https://pgrealtime.com/favicon-96x96.png",
        dark: "https://pgrealtime.com/favicon-96x96.png"
      }}
      colors={{
        light: {
          background: "#FFF8F9",
          primary: "#FF1F57"
        },
        dark: {
          background: "#14040A",
          primary: "#FF637E"
        }
      }}
      classNames={{
        card: "border-none rounded-3xl",
        button: "rounded-full"
      }}
      head={
        <Font
          fontFamily="Ubuntu"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: "https://cdn.jsdelivr.net/fontsource/fonts/ubuntu-sans:vf@latest/latin-wght-normal.woff2",
            format: "woff2"
          }}
          fontWeight="100 800"
        />
      }
      poweredBy={true}
    />
  )
}

PasswordChangedEmail.PreviewProps = {
  email: "support@pgrealtime.com",
  supportEmail: "support@pgrealtime.com",
  secureAccountURL: "mailto:support@pgrealtime.com?subject=Secure my account",
  timestamp: new Date().toString()
}

export default PasswordChangedEmail
