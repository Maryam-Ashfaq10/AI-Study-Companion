import { useQuery } from '@tanstack/react-query';

import { getNoteById } from '../api/note.api';

export const useNote = (id: number) => {
  return useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
  });
};