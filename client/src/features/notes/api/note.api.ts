import api from '../../../lib/axios';

import type {
  Note,
  CreateNotePayload,
  UpdateNotePayload,
} from '../types/note.types';

interface NoteResponse {
  success: boolean;
  data: Note;
  message?: string;
}

interface NotesResponse {
  success: boolean;
  data: Note[];
}

export const getNotes = async (
  subjectId?: number
): Promise<Note[]> => {
  const response = await api.get<NotesResponse>(
    '/notes/all',
    {
      params: subjectId
        ? { subjectId }
        : undefined,
    }
  );

  return response.data.data;
};

export const getNoteById = async (
  id: number
): Promise<Note> => {
  const response = await api.get<NoteResponse>(
    `/notes/${id}`
  );

  return response.data.data;
};

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const response = await api.post<NoteResponse>(
    '/notes/create',
    payload
  );

  return response.data.data;
};

export const updateNote = async (
  id: number,
  payload: UpdateNotePayload
): Promise<Note> => {
  const response = await api.put<NoteResponse>(
    `/notes/${id}`,
    payload
  );

  return response.data.data;
};

export const deleteNote = async (
  id: number
): Promise<void> => {
  await api.delete(`/notes/${id}`);
};