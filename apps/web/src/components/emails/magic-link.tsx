import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text
} from "@react-email/components"
import colors from "tailwindcss/colors"
import { cn } from "@/lib/utils"

interface MagicLinkProps {
  url?: string
  email?: string
  appName?: string
  expirationMinutes?: number
  logoURL?: string
  classNames?: {
    body?: string
    container?: string
    card?: string
    logo?: string
    title?: string
    content?: string
    button?: string
    description?: string
    separator?: string
    link?: string
    poweredBy?: string
  }
  colors?: {
    background?: string
    border?: string
    card?: string
    cardForeground?: string
    foreground?: string
    primary?: string
    primaryForeground?: string
    muted?: string
    mutedForeground?: string
  }
  poweredBy?: boolean
}

const neutralColors = {
  background: colors.neutral[100],
  border: colors.neutral[200],
  card: colors.white,
  cardForeground: colors.neutral[950],
  foreground: colors.neutral[950],
  primary: colors.neutral[900],
  primaryForeground: colors.white,
  muted: colors.neutral[100],
  mutedForeground: colors.neutral[500]
}

export const MagicLink = ({
  url,
  email,
  appName,
  expirationMinutes = 15,
  logoURL = "https://better-auth.com/logo.png",
  colors,
  classNames
}: MagicLinkProps) => {
  const previewText = `Sign in to ${appName}`

  return (
    <Html>
      <Head></Head>
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                ...neutralColors,
                ...colors
              }
            }
          }
        }}
      >
        <Body
          className={cn(
            "mx-auto my-auto px-2 bg-background font-sans",
            classNames?.body
          )}
        >
          <Container
            className={cn("mx-auto my-10 max-w-xl", classNames?.container)}
          >
            <Section
              className={cn(
                "bg-card text-card-foreground flex flex-col gap-6 rounded-none border border-border p-8",
                classNames?.card
              )}
            >
              <Section className="mb-8 text-center">
                <Img
                  src={logoURL}
                  width={48}
                  alt="Logo"
                  className={cn("mx-auto block h-auto", classNames?.logo)}
                />
              </Section>

              <Heading
                className={cn(
                  "m-0 mb-5 text-2xl font-semibold",
                  classNames?.title
                )}
              >
                Sign in to {appName || "your account"}
              </Heading>

              <Text
                className={cn(
                  "mt-0 mb-5 text-sm font-normal",
                  classNames?.content
                )}
              >
                Click the button below to sign in to your account
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="text-primary font-medium"
                  >
                    {" "}
                    {email}
                  </a>
                )}
                .
              </Text>

              <Section className="my-6">
                <Button
                  href={url}
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-semibold h-10 px-6 bg-primary text-primary-foreground no-underline",
                    classNames?.button
                  )}
                >
                  Sign in to {appName || "your account"}
                </Button>
              </Section>

              <Text
                className={cn(
                  "mt-5 mb-3 text-xs text-muted-foreground",
                  classNames?.description
                )}
              >
                Or copy and paste this URL into your browser:
              </Text>

              <Link
                className={cn(
                  "mt-0 mb-5 break-all text-xs text-primary",
                  classNames?.link
                )}
                href={url}
              >
                {url}
              </Link>

              <Hr
                className={cn(
                  "mx-0 my-6 w-full border border-solid border-border",
                  classNames?.separator
                )}
              />

              <Text
                className={cn(
                  "mt-0 mb-3 text-xs text-muted-foreground",
                  classNames?.description
                )}
              >
                This link expires in {expirationMinutes} minutes.
                {appName && <> Email sent by {appName}.</>}
              </Text>

              <Text
                className={cn(
                  "mt-3 mb-4 text-xs text-muted-foreground",
                  classNames?.description
                )}
              >
                If you didn't request this email, you can safely ignore it.
                Someone else might have typed your email address by mistake.
              </Text>

              <Text
                className={cn(
                  "mt-0 mb-0 text-center text-[11px] text-muted-foreground",
                  classNames?.poweredBy
                )}
              >
                Powered by{" "}
                <Link
                  href="https://better-auth.com"
                  className={cn("text-primary underline", classNames?.link)}
                >
                  better-auth
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

MagicLink.PreviewProps = {
  magicLink: "https://better-auth-ui.com/auth/verify?token=abc123def456",
  email: "daveycodez@gmail.com",
  appName: "Better Auth"
} as MagicLinkProps

export default MagicLink
