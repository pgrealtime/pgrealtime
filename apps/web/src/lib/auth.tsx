import { MagicLinkEmail } from "@better-auth-ui/heroui"
import { render } from "@react-email/render"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { magicLink } from "better-auth/plugins"
import nodemailer from "nodemailer"
import colors from "tailwindcss/colors"
import { db } from "@/database/db"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
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
        const emailHtml = await render(
          <MagicLinkEmail
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
            font={{
              fontFamily: "Ubuntu",
              webFont: {
                url: "https://cdn.jsdelivr.net/fontsource/fonts/ubuntu-sans:vf@latest/latin-wght-normal.woff2",
                format: "woff2"
              },
              fontWeight: "100 800"
            }}
          />
        )

        await transporter.sendMail({
          from: "pgrealtime <noreply@auth.pgrealtime.com>",
          to: email,
          subject: "Sign in to pgrealtime",
          html: emailHtml
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
