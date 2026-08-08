import prisma from '../utils/prisma.js';

interface CreateNoteInput {
  title: string;
  content: string;
  subjectId: number;
}

interface UpdateNoteInput {
  title: string;
  content: string;
  subjectId: number;
}

export const createNote = async (
  userId: number,
  payload: CreateNoteInput
) => {
  const subject = await prisma.subject.findFirst({
    where: {
      id: payload.subjectId,
      userId,
    },
  });

  if (!subject) {
    return null;
  }

  return prisma.note.create({
    data: {
      title: payload.title,
      content: payload.content,
      subjectId: payload.subjectId,
    },
  });
};

export const getNotes = async (
  userId: number,
  subjectId?: number
) => {
  return prisma.note.findMany({
    where: {
      subject: {
        userId,
      },

      ...(subjectId && {
        subjectId,
      }),
    },

    include: {
      subject: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
    },

    orderBy: {
      updatedAt: 'desc',
    },
  });
};

export const getNoteById = async (
  id: number,
  userId: number
) => {
  return prisma.note.findFirst({
    where: {
      id,

      subject: {
        userId,
      },
    },

    include: {
      subject: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
  });
};

export const updateNote = async (
  id: number,
  userId: number,
  payload: UpdateNoteInput
) => {
  const note = await prisma.note.findFirst({
    where: {
      id,

      subject: {
        userId,
      },
    },
  });

  if (!note) {
    return null;
  }

  const newSubject = await prisma.subject.findFirst({
    where: {
      id: payload.subjectId,
      userId,
    },
  });

  if (!newSubject) {
    return null;
  }

  return prisma.note.update({
    where: {
      id,
    },

    data: {
      title: payload.title,
      content: payload.content,
      subjectId: payload.subjectId,
    },
  });
};

export const deleteNote = async (
  id: number,
  userId: number
) => {
  const note = await prisma.note.findFirst({
    where: {
      id,

      subject: {
        userId,
      },
    },
  });

  if (!note) {
    return null;
  }

  await prisma.note.delete({
    where: {
      id,
    },
  });

  return true;
};