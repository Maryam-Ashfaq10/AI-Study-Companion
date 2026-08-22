import { z } from 'zod';

export const noteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Note title is required')
    .max(
      200,
      'Note title cannot exceed 200 characters'
    ),

  content: z
    .string()
    .trim()
    .min(1, 'Note content is required'),
});

export type NoteFormData = z.infer<
  typeof noteSchema
>;