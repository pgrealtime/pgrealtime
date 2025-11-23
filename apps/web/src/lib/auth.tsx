import { render } from "@react-email/render"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { magicLink } from "better-auth/plugins"
import nodemailer from "nodemailer"
import MagicLinkEmail from "@/components/email/magic-link"
import { Logo } from "@/components/logo"
import { db } from "@/database/db"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false for STARTTLS (port 587), true for SSL/TLS (port 465)
  requireTLS: true, // Require TLS upgrade for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
})

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    camelCase: true
  }),
  emailAndPassword: {
    enabled: true
  },
  plugins: [
    magicLink({
      async sendMagicLink({ email, url }) {
        const html = await render(
          <MagicLinkEmail
            url={url}
            email={email}
            siteName="pgrealtime"
            logo={<Logo className="h-8 w-8 text-[#ff637e]" />}
          />
        )

        await transporter.sendMail({
          from: "PgRealtime <noreply@auth.pgrealtime.com>",
          to: email,
          subject: "Sign in to your account",
          html,
          text: `Sign in to your account: ${url}\n\nThis link expires in 5 minutes.`
        })
      },
      expiresIn: 300, // 5 minutes
      disableSignUp: false
    })
  ],
  advanced: {
    database: {
      generateId: false
    }
  }
})
