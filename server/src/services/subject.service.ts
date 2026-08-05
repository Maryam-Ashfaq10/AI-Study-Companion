import prisma from '../utils/prisma.js';

interface CreateSubjectInput {
  name: string;
  description?: string;
  color?: string;
}

export const createSubject = async (
  userId: number,
  payload: CreateSubjectInput
) => {
  return prisma.subject.create({
    data: {
      ...payload,
      userId,
    },
  });
};