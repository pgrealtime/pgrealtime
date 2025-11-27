import { waitUntil } from "cloudflare:workers"
import { emailLocalization } from "@better-auth-ui/heroui"
import { render } from "@react-email/render"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { magicLink } from "better-auth/plugins"
import { EmailVerificationEmail } from "@/components/emails/email-verification"
import { MagicLinkEmail } from "@/components/emails/magic-link"
import { PasswordChangedEmail } from "@/components/emails/password-changed"
import { ResetPasswordEmail } from "@/components/emails/reset-password"
import { db } from "@/database/db"
import { createTransporter } from "./transporter"

const from = "pgrealtime <noreply@auth.pgrealtime.com>"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    camelCase: true
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user: { email }, url }) {
      waitUntil(
        (async () => {
          const emailHtml = await render(
            <ResetPasswordEmail email={email} url={url} />
          )

          await createTransporter().sendMail({
            from,
            to: email,
            subject: emailLocalization.RESET_YOUR_PASSWORD,
            html: emailHtml
          })
        })()
      )
    },
    onPasswordChange({ user: { email } }) {
      waitUntil(
        (async () => {
          const emailHtml = await render(
            <PasswordChangedEmail
              email={email}
              secureAccountURL="mailto:support@pgrealtime.com?subject=Secure my account"
              timestamp={new Date().toString()}
            />
          )

          await createTransporter().sendMail({
            from,
            to: email,
            subject: emailLocalization.PASSWORD_CHANGED_SUCCESSFULLY,
            html: emailHtml
          })
        })()
      )
    }
  },
  emailVerification: {
    enabled: true,
    async sendVerificationEmail({ user: { email }, url }) {
      waitUntil(
        (async () => {
          const emailHtml = await render(
            <EmailVerificationEmail email={email} url={url} />
          )

          await createTransporter().sendMail({
            from,
            to: email,
            subject: emailLocalization.VERIFY_YOUR_EMAIL_ADDRESS,
            html: emailHtml
          })
        })()
      )
    }
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }
  },
  plugins: [
    magicLink({
      async sendMagicLink({ email, url }) {
        waitUntil(
          (async () => {
            const emailHtml = await render(
              <MagicLinkEmail email={email} url={url} />
            )

            await createTransporter().sendMail({
              from,
              to: email,
              subject: emailLocalization.SIGN_IN_TO_YOUR_ACCOUNT,
              html: emailHtml
            })
          })()
        )
      }
    })
  ],
  advanced: {
    database: {
      generateId: false
    }
  }
})
