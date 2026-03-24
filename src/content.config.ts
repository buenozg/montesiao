import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const solutions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/solutions' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    segment: z.enum(['Saude', 'Tecnologia', 'Infraestrutura', 'Financas', 'Logistica']),
    tags: z.array(z.string()).min(2),
    tagline: z.string(),
    heroSummary: z.string(),
    headline: z.string(),
    description: z.string(),
    services: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      )
      .length(4),
    highlights: z.array(z.string()).min(3),
    kpis: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .min(3),
    differentials: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        }),
      )
      .length(3),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    ctaTitle: z.string(),
    ctaDescription: z.string(),
    ctaLabel: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { solutions };
