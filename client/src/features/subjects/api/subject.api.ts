import api from '../../../lib/axios';

import type {
  Subject,
  CreateSubjectPayload,
  UpdateSubjectPayload,
} from '../types/subject.types';

interface SubjectResponse {
  success: boolean;
  data: Subject;
  message?: string;
}

interface SubjectsResponse {
  success: boolean;
  data: Subject[];
}

export const getSubjects = async (): Promise<Subject[]> => {
  const response = await api.get<SubjectsResponse>('/subjects');

  return response.data.data;
};

export const getSubjectById = async (
  id: number
): Promise<Subject> => {
  const response = await api.get<SubjectResponse>(
    `/subjects/${id}`
  );

  return response.data.data;
};

export const createSubject = async (
  payload: CreateSubjectPayload
): Promise<Subject> => {
  const response = await api.post<SubjectResponse>(
    '/subjects',
    payload
  );

  return response.data.data;
};

export const updateSubject = async (
  id: number,
  payload: UpdateSubjectPayload
): Promise<Subject> => {
  const response = await api.put<SubjectResponse>(
    `/subjects/${id}`,
    payload
  );

  return response.data.data;
};

export const deleteSubject = async (
  id: number
): Promise<void> => {
  await api.delete(`/subjects/${id}`);
};