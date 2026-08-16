import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  deleteSubject,
} from '../api/subject.api';

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      deleteSubject(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subjects'],
      });
    },
  });
};