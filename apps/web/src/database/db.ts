import { env } from "cloudflare:workers"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

console.log(process.env.FOO)
const sql = neon(env.DATABASE_URL || "postgres://foo:bar@localhost")
export const db = drizzle(sql, { schema })
