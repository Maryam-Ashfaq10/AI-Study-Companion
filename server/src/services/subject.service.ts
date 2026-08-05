import prisma from '../utils/prisma.js';

interface CreateSubjectInput {
  name: string;
  description?: string;
  color?: string;
}

interface UpdateSubjectInput {
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

export const getSubjects = async (userId: number) => {
  return prisma.subject.findMany({
  where: {
    userId,
  },
  include: {
    _count: {
      select: {
        notes: true,
      },
    },
  },
  orderBy: {
    name: 'asc',
  },
});
};

export const getSubjectById = async (
  id: number,
  userId: number
) => {
  return prisma.subject.findFirst({
    where: {
      id,
      userId,
    },
  });
};

export const updateSubject = async (
  id: number,
  userId: number,
  payload: UpdateSubjectInput
) => {
  const subject = await prisma.subject.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!subject) {
    return null;
  }

  return prisma.subject.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const deleteSubject = async (
  id: number,
  userId: number
) => {
  const subject = await prisma.subject.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!subject) {
    return null;
  }

  await prisma.subject.delete({
    where: {
      id,
    },
  });

  return true;
};