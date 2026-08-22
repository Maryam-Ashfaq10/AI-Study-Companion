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

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      queryClient.invalidateQueries({
        queryKey: ['note', variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ['subjects'],
      });

      queryClient.invalidateQueries({
        queryKey: [
          'subjects',
          variables.payload.subjectId,
        ],
      });
    },
  });
};