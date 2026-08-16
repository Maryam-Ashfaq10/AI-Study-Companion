import { useQuery } from '@tanstack/react-query';

import { getSubjectById } from '../api/subject.api';


export const useSubject = (id: number) => {
  return useQuery({
    queryKey: ['subjects', id],
    queryFn: () => getSubjectById(id),
    enabled: !!id,
  });
}