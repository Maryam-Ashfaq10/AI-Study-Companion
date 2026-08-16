export interface Subject {
  id: number;
  name: string;
  description?: string | null;
  color?: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
  _count?: {
    notes: number;
  };
}

export interface CreateSubjectPayload {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateSubjectPayload {
  name: string;
  description?: string;
  color?: string;
}