import { neon } from "@neondatabase/serverless"
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http"
import * as schema from "./schema"

let db: NeonHttpDatabase<typeof schema>

try {
  const sql = neon(process.env.DATABASE_URL as string)
  db = drizzle(sql, { schema })
} catch (_) {}

export { db }
