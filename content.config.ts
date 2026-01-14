import { defineCollection, defineContentConfig } from "@nuxt/content"
import { z } from "zod"

const multilineCopy = z.union([z.string(), z.array(z.string())])

const money = z.object({
  amount: z.number(),
  currency: z.string()
})

const menuItem = z.object({
  id: z.string(),
  name: z.string(),
  description: multilineCopy,
  price: money,
  tags: z.array(z.string()).optional(),
  allergens: z.array(z.string()).optional()
})

const menuBlock = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("callout"),
    title: z.string(),
    body: multilineCopy,
    variant: z.string().optional()
  }),
  z.object({
    type: z.literal("category"),
    title: z.string(),
    subtitle: multilineCopy.optional()
  }),
  z.object({
    type: z.literal("item"),
    item: menuItem
  }),
  z.object({
    type: z.literal("note"),
    body: multilineCopy
  })
])

export default defineContentConfig({
  collections: {
    menus: defineCollection({
      type: "data",
      source: "menus/**/*.yml",
      schema: z.object({
        pageTitle: z.string(),
        locale: z.string(),
        defaultCurrency: z.string(),
        blocks: z.array(menuBlock)
      })
    })
  }
})
