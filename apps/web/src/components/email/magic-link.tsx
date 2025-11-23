import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text
} from "@react-email/components"
import type * as React from "react"

const MagicLinkEmail = (props: {
  url?: string
  email?: string
  siteName?: string
  logoUrl?: string
  logo?: React.ReactNode
}) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Your secure sign-in link is ready</Preview>
        <Body
          className="font-sans py-[40px]"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <Container className="max-w-[580px] mx-auto">
            {/* Branding Header - Outside Card */}
            <Section className="mb-[32px]">
              <Row>
                <Column align="left">
                  <table
                    cellPadding="0"
                    cellSpacing="0"
                    style={{ width: "auto" }}
                  >
                    <tr>
                      {(props.logo || props.logoUrl) && (
                        <td
                          style={{
                            verticalAlign: "middle",
                            paddingRight: "8px"
                          }}
                        >
                          {props.logo ? (
                            <div
                              style={{
                                height: "32px",
                                display: "flex",
                                alignItems: "center"
                              }}
                            >
                              {props.logo}
                            </div>
                          ) : (
                            <Img
                              src={props.logoUrl}
                              alt={`${props.siteName || "Company"} Logo`}
                              className="w-auto h-[32px]"
                              style={{
                                height: "32px",
                                width: "auto",
                                maxWidth: "120px",
                                display: "block"
                              }}
                            />
                          )}
                        </td>
                      )}
                      {props.siteName && (
                        <td style={{ verticalAlign: "middle" }}>
                          <Heading
                            className="text-[20px] font-semibold text-[#111827] m-0 email-brand-text"
                            style={{
                              color: "#111827",
                              margin: "0",
                              lineHeight: "1.2"
                            }}
                          >
                            {props.siteName}
                          </Heading>
                        </td>
                      )}
                    </tr>
                  </table>
                </Column>
              </Row>
            </Section>

            {/* Main Card Content */}
            <Container
              className="rounded-[24px] shadow-sm p-[40px] email-card"
              style={{
                backgroundColor: "#EBEBEB",
                colorScheme: "light dark"
              }}
            >
              {/* Header */}
              <Section className="text-center mb-[32px]">
                <Heading
                  className="text-[24px] font-semibold text-[#111827] m-0 mb-[8px] email-heading"
                  style={{ color: "#111827" }}
                >
                  Sign in to your account
                </Heading>
                <Text
                  className="text-[14px] text-[#6b7280] m-0 email-text"
                  style={{ color: "#6b7280" }}
                >
                  Click the button below to securely access your account
                </Text>
              </Section>

              {/* Magic Link Button */}
              <Section className="text-center mb-[32px]">
                <Button
                  href={props.url}
                  className="px-[32px] py-[12px] rounded-full text-[14px] font-medium no-underline box-border inline-block email-accent email-button-text"
                  style={{
                    backgroundColor: "#ff2056",
                    color: "#fcfcfc",
                    height: "40px",
                    lineHeight: "16px",
                    display: "inline-block",
                    verticalAlign: "middle"
                  }}
                >
                  Sign In
                </Button>
              </Section>

              {/* Alternative Link */}
              <Section className="mb-[32px]">
                <Text
                  className="text-[14px] text-[#6b7280] m-0 mb-[16px] email-text"
                  style={{ color: "#6b7280" }}
                >
                  If the button doesn't work, you can copy and paste this link
                  into your browser:
                </Text>
                <Text
                  className="text-[14px] p-[12px] rounded-[12px] border border-[#e5e7eb] break-all m-0 email-code-block"
                  style={{
                    backgroundColor: "#F5F5F5",
                    borderColor: "#e5e7eb"
                  }}
                >
                  <Link
                    href={props.url}
                    className="no-underline email-accent-link"
                    style={{ color: "#ff2056" }}
                  >
                    {props.url}
                  </Link>
                </Text>
              </Section>

              {/* Security Info */}
              <Section
                className="border-t border-[#e5e7eb] pt-[24px] email-border"
                style={{ borderTopColor: "#e5e7eb" }}
              >
                <Text
                  className="text-[14px] text-[#6b7280] m-0 mb-[12px] email-text"
                  style={{ color: "#6b7280" }}
                >
                  <strong className="email-strong" style={{ color: "#374151" }}>
                    Security Information:
                  </strong>
                </Text>
                <Text
                  className="text-[14px] text-[#6b7280] m-0 mb-[8px] email-text"
                  style={{ color: "#6b7280" }}
                >
                  • This link can only be used once
                </Text>
                <Text
                  className="text-[14px] text-[#6b7280] m-0 email-text"
                  style={{ color: "#6b7280" }}
                >
                  • If you didn't request this, please ignore this email
                </Text>
              </Section>
            </Container>

            {/* Footer - Outside Card */}
            <Section className="mt-[32px]">
              <Text
                className="text-[12px] text-[#9ca3af] text-center m-0 mb-[8px] email-footer"
                style={{ color: "#9ca3af" }}
              >
                This email was sent by {props.siteName || "Better Auth"}
              </Text>
              <Text
                className="text-[12px] text-[#9ca3af] text-center m-0 email-footer"
                style={{ color: "#9ca3af" }}
              >
                © {new Date().getFullYear()} {props.siteName || "Better Auth"}.
                All rights reserved.
              </Text>
            </Section>
          </Container>

          {/* Dark mode styles */}
          <div style={{ display: "none" }}>
            {`
              @media (prefers-color-scheme: dark) {
                .email-body {
                  background-color: #060607 !important;
                }
                .email-card {
                  background-color: #141414 !important;
                }
                .email-heading {
                  color: #f9fafb !important;
                }
                .email-brand-text {
                  color: #f9fafb !important;
                }
                .email-text {
                  color: #d1d5db !important;
                }
                .email-footer {
                  color: #9ca3af !important;
                }
                .email-strong {
                  color: #f9fafb !important;
                }
                .email-code-block {
                  background-color: #1f1f23 !important;
                  border-color: #3f3f46 !important;
                }
                .email-border {
                  border-color: #3f3f46 !important;
                }
                .email-accent {
                  background-color: #ff637e !important;
                }
                .email-button-text {
                  color: #18181b !important;
                }
                .email-accent-link {
                  color: #ff637e !important;
                }
              }
            `}
          </div>
        </Body>
      </Tailwind>
    </Html>
  )
}

// Example SVG component for preview
const ExampleLogo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>pgrealtime</title>
    <rect width="32" height="32" rx="8" fill="#ff2056" />
    <path
      d="M8 16L14 22L24 10"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

MagicLinkEmail.PreviewProps = {
  url: "https://yourapp.com/auth/verify?token=abc123xyz789",
  email: "daveycodez@gmail.com",
  siteName: "Acme Corp",
  logo: <ExampleLogo />
  // logoUrl: "https://new.email/static/app/placeholder.png", // Fallback option
}

export default MagicLinkEmail
