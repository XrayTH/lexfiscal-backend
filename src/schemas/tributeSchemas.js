import { z } from "zod"

export const slugParams = z.object({
  slug: z.string().min(1).regex(/^[a-zA-Z0-9-_]+$/, "slug inválido")
})

export const paginationQuery = z.object({
  page: z.preprocess((val) => {
    if (val === undefined || val === null || val === "") return undefined
    const n = Number(val)
    return Number.isNaN(n) ? val : n
  }, z.number().int().positive().default(1)),
  limit: z.preprocess((val) => {
    if (val === undefined || val === null || val === "") return undefined
    const n = Number(val)
    return Number.isNaN(n) ? val : n
  }, z.number().int().positive().max(100).default(20)),
  q: z.string().optional()
})

