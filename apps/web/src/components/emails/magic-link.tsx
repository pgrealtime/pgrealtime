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

const neutralColors = {
  light: {
    background: colors.neutral[100],
    border: colors.neutral[200],
    card: colors.white,
    cardForeground: colors.neutral[950],
    foreground: colors.neutral[950],
    muted: colors.neutral[100],
    mutedForeground: colors.neutral[500],
    primary: colors.neutral[900],
    primaryForeground: colors.white
  },
  dark: {
    background: colors.neutral[950],
    border: colors.neutral[800],
    card: colors.neutral[900],
    cardForeground: colors.neutral[50],
    foreground: colors.neutral[50],
    muted: colors.neutral[800],
    mutedForeground: colors.neutral[400],
    primary: colors.neutral[100],
    primaryForeground: colors.black
  }
}

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
    light?: Partial<typeof neutralColors.light>
    dark?: Partial<typeof neutralColors.dark>
  }
  poweredBy?: boolean
  darkMode?: boolean
}

export const MagicLink = ({
  url,
  email,
  appName,
  expirationMinutes = 15,
  logoURL = "https://better-auth.com/logo.png",
  colors,
  classNames,
  darkMode = true,
  poweredBy = true
}: MagicLinkProps) => {
  const previewText = `Sign in to ${appName}`
  return (
    <Html>
      <Head>
        <meta content="light dark" name="color-scheme" />
        <meta content="light dark" name="supported-color-schemes" />

        <style type="text/css">{`
          .bg-background {
            background-color: ${colors?.light?.background || neutralColors.light.background} !important;
          }
          .bg-card {
            background-color: ${colors?.light?.card || neutralColors.light.card} !important;
          }
          .bg-primary {
            background-color: ${colors?.light?.primary || neutralColors.light.primary} !important;
          }
          .border-border {
            border-color: ${colors?.light?.border || neutralColors.light.border} !important;
          }
          .text-card-foreground {
            color: ${colors?.light?.cardForeground || neutralColors.light.cardForeground} !important;
          }
          .text-muted-foreground {
            color: ${colors?.light?.mutedForeground || neutralColors.light.mutedForeground} !important;
          }
          .text-primary {
            color: ${colors?.light?.primary || neutralColors.light.primary} !important;
          }
          .text-primary-foreground {
            color: ${colors?.light?.primaryForeground || neutralColors.light.primaryForeground} !important;
          }
          ${
            darkMode
              ? `@media (prefers-color-scheme: dark) {
            .bg-background {
              background-color: ${colors?.dark?.background || neutralColors.dark.background} !important;
            }
            .bg-card {
              background-color: ${colors?.dark?.card || neutralColors.dark.card} !important;
            }
            .bg-primary {
              background-color: ${colors?.dark?.primary || neutralColors.dark.primary} !important;
            }
            .border-border {
              border-color: ${colors?.dark?.border || neutralColors.dark.border} !important;
            }
            .text-card-foreground {
              color: ${colors?.dark?.cardForeground || neutralColors.dark.cardForeground} !important;
            }
            .text-muted-foreground {
              color: ${colors?.dark?.mutedForeground || neutralColors.dark.mutedForeground} !important;
            }
            .text-primary {
              color: ${colors?.dark?.primary || neutralColors.dark.primary} !important;
            }
            .text-primary-foreground {
              color: ${colors?.dark?.primaryForeground || neutralColors.dark.primaryForeground} !important;
            }
            * {
              box-shadow: none !important;
            }
          }`
              : ""
          }
        `}</style>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset]
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
                  <>
                    {" "}
                    <a
                      href={`mailto:${email}`}
                      className="text-primary font-medium"
                    >
                      {email}
                    </a>
                  </>
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
                  "mt-3 mb-0 text-xs text-muted-foreground",
                  classNames?.description
                )}
              >
                If you didn't request this email, you can safely ignore it.
                Someone else might have typed your email address by mistake.
              </Text>

              {poweredBy && (
                <Text
                  className={cn(
                    "mt-4 mb-0 text-center text-[11px] text-muted-foreground",
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
              )}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

MagicLink.PreviewProps = {
  url: "https://better-auth-ui.com/auth/verify?token=abc123def456",
  email: "daveycodez@gmail.com",
  appName: "Better Auth",
  darkMode: false
} as MagicLinkProps

MagicLink.PreviewProps = {
  url: "https://better-auth-ui.com/auth/verify?token=abc123def456",
  email: "daveycodez@gmail.com",
  appName: "pgrealtime",
  logoURL: "https://pgrealtime.com/favicon-96x96.png",
  colors: {
    light: {
      background: "#FFF8F9",
      primary: colors.rose[500]
    },
    dark: {
      background: "#14040A",
      primary: colors.rose[400]
    }
  },
  classNames: {
    card: "border-none rounded-3xl shadow-md",
    button: "rounded-full"
  },
  poweredBy: true,
  darkMode: true
} as MagicLinkProps

export default MagicLink
