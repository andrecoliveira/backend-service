import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const databaseURL = generateUniqueDatabaseURL(randomUUID())

// criando um banco de dados para cada teste
beforeAll(async () => {
  process.env.DATABASE_URL = databaseURL
  execSync('pnpm prisma migrate deploy')
})
// removendo o banco de dados após cada teste
afterAll(async () => {
  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${databaseURL}" CASCADE`,
  )
  await prisma.$disconnect()
})
