import { render } from "@react-email/render"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { magicLink } from "better-auth/plugins"
import nodemailer from "nodemailer"
import colors from "tailwindcss/colors"
import { MagicLink } from "@/components/emails/magic-link"
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
          <MagicLink
            url={url}
            email={email}
            appName="pgrealtime"
            logoURL={{
              light: "http://localhost:3000/logo-light.png",
              dark: "http://localhost:3000/logo-dark.png"
            }}
            colors={{
              light: {
                background: "#FFF8F9",
                primary: colors.rose[500]
              },
              dark: {
                background: "#14040A",
                primary: colors.rose[400]
              }
            }}
            classNames={{
              card: "border-none rounded-3xl shadow-md",
              button: "rounded-full"
            }}
          />
        )

        await transporter.sendMail({
          from: "pgrealtime <noreply@auth.pgrealtime.com>",
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
