import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { updateNote } from '../api/note.api';

import type {
  UpdateNotePayload,
} from '../types/note.types';

interface UpdateNoteVariables {
  id: number;
  payload: UpdateNotePayload;
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: UpdateNoteVariables) =>
      updateNote(id, payload),

    onSuccess: (updatedNote) => {
      queryClient.invalidateQueries({
        queryKey: [
          'notes',
          updatedNote.subjectId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ['note', updatedNote.id],
      });

      queryClient.invalidateQueries({
        queryKey: ['subjects'],
      });

      queryClient.invalidateQueries({
        queryKey: [
          'subjects',
          updatedNote.subjectId,
        ],
      });
    },
  });
};