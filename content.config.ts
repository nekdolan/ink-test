import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      // Load every file inside the `content` directory
      source: 'posts/**/*.mdx',
      // Specify the type of content in this collection
      type: 'page',
      schema: z.object({
        title: z.string(),
        short: z.string(),
        public: z.boolean(),
        vid: z.string(),
        date: z.date(),
      })
    })
  }
})
