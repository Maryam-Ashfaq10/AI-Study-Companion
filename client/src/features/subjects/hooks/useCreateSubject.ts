import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createSubject,
} from '../api/subject.api';

import type{
  CreateSubjectPayload,
} from '../types/subject.types';

export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSubjectPayload) =>
      createSubject(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subjects'],
      });
    },
  });
};