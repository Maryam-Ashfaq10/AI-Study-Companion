import { z } from 'zod';

export const createSubjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, 'Subject name must be at least 2 characters')
      .max(100),

    description: z
      .string()
      .trim()
      .max(500)
      .optional(),

    color: z
      .string()
      .trim()
      .max(20)
      .optional(),
  }),
});

export const updateSubjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(100),

    description: z
      .string()
      .trim()
      .max(500)
      .optional(),

    color: z
      .string()
      .trim()
      .max(20)
      .optional(),
  }),

  params: z.object({
    id: z.coerce.number().positive(),
  }),
});

export const subjectIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),
});