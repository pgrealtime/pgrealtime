import { MagicLinkEmail as MagicLinkTemplate } from "@better-auth-ui/heroui"
import { Font } from "@react-email/font"

export function MagicLinkEmail({ email, url }: { email: string; url: string }) {
  return (
    <MagicLinkTemplate
      url={url}
      email={email}
      appName="pgrealtime"
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

MagicLinkEmail.PreviewProps = {
  url: "https://pgrealtime.com/auth/verify?token=example-token",
  email: "support@pgrealtime.com"
}

export default MagicLinkEmail
