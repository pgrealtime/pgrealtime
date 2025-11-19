#!/usr/bin/env ts-node

import * as fs from "node:fs"
import * as path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Search from the src directory to find auth-schema.ts
// From scripts/, go up one level to apps/web/, then into src/
const srcDir = path.resolve(__dirname, "..", "src")

function findAuthSchema(startDir: string): string {
  function searchDirectory(dir: string): string | null {
    const files = fs.readdirSync(dir, { withFileTypes: true })

    for (const file of files) {
      const fullPath = path.join(dir, file.name)

      if (file.isFile() && file.name === "auth-schema.ts") {
        return fullPath
      }

      if (
        file.isDirectory() &&
        !file.name.startsWith(".") &&
        file.name !== "node_modules"
      ) {
        const found = searchDirectory(fullPath)
        if (found) return found
      }
    }

    return null
  }

  const found = searchDirectory(startDir)
  if (!found) {
    throw new Error(
      `Could not find auth-schema.ts in ${startDir} or subdirectories`
    )
  }

  return found
}

const AUTH_SCHEMA_PATH = findAuthSchema(srcDir)

function migrateIdsToUuid() {
  console.log(`Reading auth-schema.ts from ${AUTH_SCHEMA_PATH}...`)
  let content = fs.readFileSync(AUTH_SCHEMA_PATH, "utf-8")

  // Step 1: Update imports to include uuid
  console.log("Updating imports...")
  const importRegex =
    /import\s*{\s*([^}]+)\s*}\s*from\s*["']drizzle-orm\/pg-core["'];?/
  const importMatch = content.match(importRegex)

  if (importMatch) {
    const imports = importMatch[1].split(",").map((i) => i.trim())
    if (!imports.includes("uuid")) {
      imports.push("uuid")
      const newImport = `import { ${imports.join(", ")} } from "drizzle-orm/pg-core";`
      content = content.replace(importRegex, newImport)
      console.log("✓ Added uuid to imports")
    }
  }

  // Step 2: Replace all id-related fields from text to uuid
  // This automatically detects any field ending with "Id", "_id", or just "id"
  // Only converts fields that are either:
  // 1. Primary keys (id: text("id").primaryKey())
  // 2. Foreign keys (userId: text("userId")...references(...) or userId: text("user_id")...references(...))
  // Skips provider-specific IDs that don't have .references()

  // Find all text("...Id"), text("..._id"), or text("id") patterns with their context
  // Use a single-pass replacement with a callback to avoid repeated replacements
  const idFieldRegex = /(\w+):\s*text\("([a-zA-Z_]*[Ii]d)"\)((?:[^,}])*)/g

  let totalReplacements = 0
  const replacedFields: string[] = []
  const skippedFields: string[] = []

  // Single-pass replacement: replace each match deterministically based on context
  content = content.replace(
    idFieldRegex,
    (match, _fieldVar, fieldName, afterPattern) => {
      // Check if this is a primary key or foreign key
      const isPrimaryKey = afterPattern.includes(".primaryKey()")
      const isForeignKey = afterPattern.includes(".references(")

      // Only convert if it's a primary key or foreign key
      if (isPrimaryKey || isForeignKey) {
        replacedFields.push(fieldName)
        totalReplacements++
        // Replace text("fieldName") with uuid("fieldName") in this specific match
        return match.replace(`text("${fieldName}")`, `uuid("${fieldName}")`)
      } else {
        // Skip non-FK, non-PK ID fields (like accountId, providerId)
        skippedFields.push(fieldName)
        return match // Return unchanged
      }
    }
  )

  // Report what was replaced
  if (replacedFields.length > 0) {
    const uniqueFields = [...new Set(replacedFields)]
    console.log(`✓ Replaced ${totalReplacements} ID fields:`)
    for (const field of uniqueFields) {
      const count = replacedFields.filter((f) => f === field).length
      console.log(`  - ${field} (${count} occurrence${count > 1 ? "s" : ""})`)
    }
  }

  // Report what was skipped
  if (skippedFields.length > 0) {
    const uniqueSkipped = [...new Set(skippedFields)]
    console.log(
      `\n⊘ Skipped ${uniqueSkipped.length} non-FK ID field(s) (keeping as text):`
    )
    for (const field of uniqueSkipped) {
      console.log(`  - ${field}`)
    }
  }

  // Step 3: Write the updated content back to the file
  if (totalReplacements > 0) {
    fs.writeFileSync(AUTH_SCHEMA_PATH, content, "utf-8")
    console.log(
      `\n✅ Successfully updated auth-schema.ts with ${totalReplacements} changes`
    )
    console.log(
      "⚠️  Note: You may need to create a new database migration for these changes"
    )
  } else {
    console.log(
      "\n⚠️  No changes were needed - all IDs may already be using uuid type"
    )
  }
}

// Run the migration
try {
  migrateIdsToUuid()
} catch (error) {
  console.error("❌ Error during migration:", error)
  process.exit(1)
}
