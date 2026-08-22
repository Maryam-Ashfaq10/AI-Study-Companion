export interface NoteSubject {
  id: number;
  name: string;
  color?: string | null;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  subjectId: number;
  createdAt: string;
  updatedAt: string;
  subject?: NoteSubject;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  subjectId: number;
}

export interface UpdateNotePayload {
  title: string;
  content: string;
  subjectId: number;
}