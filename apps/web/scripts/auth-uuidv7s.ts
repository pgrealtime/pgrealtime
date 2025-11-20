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

function migrateIdsToUuidV7() {
  console.log(`Reading auth-schema.ts from ${AUTH_SCHEMA_PATH}...`)
  let content = fs.readFileSync(AUTH_SCHEMA_PATH, "utf-8")

  // Step 1: Update imports to include uuid and sql
  console.log("Updating imports...")
  const pgCoreImportRegex =
    /import\s*{\s*([^}]+)\s*}\s*from\s*["']drizzle-orm\/pg-core["'];?/
  const pgCoreImportMatch = content.match(pgCoreImportRegex)

  if (pgCoreImportMatch) {
    const imports = pgCoreImportMatch[1].split(",").map((i) => i.trim())
    if (!imports.includes("uuid")) {
      imports.push("uuid")
      const newImport = `import { ${imports.join(", ")} } from "drizzle-orm/pg-core";`
      content = content.replace(pgCoreImportRegex, newImport)
      console.log("✓ Added uuid to imports")
    }
  }

  // Check for sql import from drizzle-orm
  const sqlImportRegex =
    /import\s*{\s*([^}]*sql[^}]*)\s*}\s*from\s*["']drizzle-orm["'];?/
  const sqlImportMatch = content.match(sqlImportRegex)
  const hasSqlImport = sqlImportMatch !== null

  if (!hasSqlImport) {
    // Check if there's already a drizzle-orm import (without sql)
    const drizzleImportRegex =
      /import\s*{\s*([^}]+)\s*}\s*from\s*["']drizzle-orm["'];?/
    const drizzleImportMatch = content.match(drizzleImportRegex)

    if (drizzleImportMatch) {
      const imports = drizzleImportMatch[1].split(",").map((i) => i.trim())
      if (!imports.includes("sql")) {
        imports.push("sql")
        const newImport = `import { ${imports.join(", ")} } from "drizzle-orm";`
        content = content.replace(drizzleImportRegex, newImport)
        console.log("✓ Added sql to drizzle-orm imports")
      }
    } else {
      // Add new import for sql
      const firstImportMatch = content.match(/^import\s+/m)
      if (firstImportMatch) {
        const insertPos = firstImportMatch.index || 0
        content =
          content.slice(0, insertPos) +
          'import { sql } from "drizzle-orm";\n' +
          content.slice(insertPos)
        console.log("✓ Added sql import from drizzle-orm")
      }
    }
  }

  // Step 2: Replace all id-related fields from text to uuid with uuidv7() default for primary keys
  // This automatically detects any field ending with "Id", "_id", or just "id"
  // Only converts fields that are either:
  // 1. Primary keys (id: text("id").primaryKey()) - adds .default(sql`uuidv7()`)
  // 2. Foreign keys (userId: text("userId")...references(...) or userId: text("user_id")...references(...))
  // Skips provider-specific IDs that don't have .references()

  // Find all text("...Id"), text("..._id"), or text("id") patterns with their context
  // Improved regex to handle multi-line field definitions:
  // - Uses [\s\S] to match any character including newlines (dotall behavior)
  // - Uses non-greedy matching with lookahead to stop at field boundary
  // - Properly handles method chains that span multiple lines
  // Pattern explanation:
  //   (\w+):\s*text\("([a-zA-Z_]*[Ii]d)"\) - matches fieldName: text("fieldName")
  //   ([\s\S]*?) - captures everything (including newlines) non-greedily until we hit:
  //   - A comma followed by whitespace and then either:
  //     * A newline and identifier+colon (next field: ,\n  fieldName:)
  //     * A closing brace (end of object: , })
  //   - OR a newline followed by whitespace and closing brace (last field: \n})
  const idFieldRegex =
    /(\w+):\s*text\("([a-zA-Z_]*[Ii]d)"\)([\s\S]*?)(?=,\s*(?:\n\s*\w+:|})|(?:\n\s*}))/g

  let totalReplacements = 0
  const replacedFields: string[] = []
  const skippedFields: string[] = []

  // Single-pass replacement: replace each match deterministically based on context
  content = content.replace(
    idFieldRegex,
    (match, _fieldVar, fieldName, afterPattern) => {
      // Check if this is a primary key or foreign key (works across newlines)
      const isPrimaryKey = afterPattern.includes(".primaryKey()")
      const isForeignKey = afterPattern.includes(".references(")

      // Only convert if it's a primary key or foreign key
      if (isPrimaryKey || isForeignKey) {
        replacedFields.push(fieldName)
        totalReplacements++

        // Replace text("fieldName") with uuid("fieldName")
        let replacement = match.replace(
          `text("${fieldName}")`,
          `uuid("${fieldName}")`
        )

        // For primary keys, add .default(sql`uuidv7()`) if not already present
        if (isPrimaryKey && !afterPattern.includes(".default(")) {
          // Find the position of .primaryKey() and insert .default(sql`uuidv7()`) before it
          replacement = replacement.replace(
            /\.primaryKey\(\)/,
            `.default(sql\`uuidv7()\`).primaryKey()`
          )
        }

        return replacement
      } else {
        // Skip non-FK, non-PK ID fields (like accountId, providerId)
        skippedFields.push(fieldName)
        return match // Return unchanged
      }
    }
  )

  // Also handle existing uuid fields that are primary keys but don't have a default
  const uuidPrimaryKeyRegex =
    /(\w+):\s*uuid\("([a-zA-Z_]*[Ii]d)"\)([\s\S]*?)(?=,\s*(?:\n\s*\w+:|})|(?:\n\s*}))/g

  let uuidDefaultsAdded = 0
  content = content.replace(
    uuidPrimaryKeyRegex,
    (match, _fieldVar, fieldName, afterPattern) => {
      const isPrimaryKey = afterPattern.includes(".primaryKey()")
      const hasDefault = afterPattern.includes(".default(")

      // Add default for primary key uuid fields that don't have one
      if (isPrimaryKey && !hasDefault) {
        uuidDefaultsAdded++
        return match.replace(
          /\.primaryKey\(\)/,
          `.default(sql\`uuidv7()\`).primaryKey()`
        )
      }
      return match
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

  // Report uuidv7 defaults added
  if (uuidDefaultsAdded > 0) {
    console.log(
      `✓ Added uuidv7() default to ${uuidDefaultsAdded} primary key uuid field(s)`
    )
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
  if (totalReplacements > 0 || uuidDefaultsAdded > 0) {
    fs.writeFileSync(AUTH_SCHEMA_PATH, content, "utf-8")
    console.log(
      `\n✅ Successfully updated auth-schema.ts with ${totalReplacements + uuidDefaultsAdded} changes`
    )
    console.log(
      "⚠️  Note: You may need to create a new database migration for these changes"
    )
  } else {
    console.log(
      "\n⚠️  No changes were needed - all IDs may already be using uuid type with uuidv7() default"
    )
  }
}

// Run the migration
try {
  migrateIdsToUuidV7()
} catch (error) {
  console.error("❌ Error during migration:", error)
  process.exit(1)
}
