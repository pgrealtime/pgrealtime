import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { reactStartCookies } from "better-auth/react-start"
import { v7 } from "uuid"
import { db } from "@/database/db"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    camelCase: true
  }),
  emailAndPassword: {
    enabled: true
  },
  advanced: {
    database: {
      generateId: () => v7()
    }
  },
  plugins: [reactStartCookies()]
})
