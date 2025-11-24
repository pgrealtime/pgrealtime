import { MagicLinkEmail } from "@better-auth-ui/heroui"
import { render } from "@react-email/render"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { magicLink } from "better-auth/plugins"
import nodemailer from "nodemailer"
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
