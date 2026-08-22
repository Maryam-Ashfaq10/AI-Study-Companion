import { useQuery } from '@tanstack/react-query';

import { getNotes } from '../api/note.api';

export const useNotes = (subjectId: number) => {
  return useQuery({
    queryKey: ['notes', subjectId],
    queryFn: () => getNotes(subjectId),
    enabled: !!subjectId,
  });
};