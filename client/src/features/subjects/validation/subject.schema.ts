import { z } from 'zod';

export const subjectSchema = z.object({
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
    .optional(),
});

export type SubjectFormData = z.infer<
  typeof subjectSchema
>;