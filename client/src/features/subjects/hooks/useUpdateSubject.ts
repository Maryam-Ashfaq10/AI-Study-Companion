import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  updateSubject,
} from '../api/subject.api';

import type {
  UpdateSubjectPayload,
} from '../types/subject.types';

interface UpdateSubjectVariables {
  id: number;
  payload: UpdateSubjectPayload;
}

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: UpdateSubjectVariables) =>
      updateSubject(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['subjects'],
      });

      queryClient.invalidateQueries({
        queryKey: ['subjects', variables.id],
      });
    },
  });
};