import { z } from 'zod';

export const createNoteSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(1, 'Note title is required')
      .max(200, 'Note title cannot exceed 200 characters'),

    content: z
      .string()
      .trim()
      .min(1, 'Note content is required'),

    subjectId: z
      .coerce
      .number()
      .int()
      .positive('Invalid subject ID'),
  }),
});

export const updateNoteSchema = z.object({
  params: z.object({
    id: z
      .coerce
      .number()
      .int()
      .positive('Invalid note ID'),
  }),

  body: z.object({
    title: z
      .string()
      .trim()
      .min(1, 'Note title is required')
      .max(200, 'Note title cannot exceed 200 characters'),

    content: z
      .string()
      .trim()
      .min(1, 'Note content is required'),

    subjectId: z
      .coerce
      .number()
      .int()
      .positive('Invalid subject ID'),
  }),
});

export const noteIdSchema = z.object({
  params: z.object({
    id: z
      .coerce
      .number()
      .int()
      .positive('Invalid note ID'),
  }),
});