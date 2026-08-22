import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { createNote } from '../api/note.api';

import type {
  CreateNotePayload,
} from '../types/note.types';

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: CreateNotePayload
    ) => createNote(payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['notes', variables.subjectId],
      });

      queryClient.invalidateQueries({
        queryKey: ['subjects'],
      });

      queryClient.invalidateQueries({
        queryKey: [
          'subjects',
          variables.subjectId,
        ],
      });
    },
  });
};