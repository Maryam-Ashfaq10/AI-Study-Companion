import type { Request, Response } from 'express';

import * as noteService from '../services/note.service.js';

export const create = async (
  req: any,
  res: Response
) => {
  const note = await noteService.createNote(
    req.user!.id,
    req.body
  );

  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Subject not found',
    });
  }

  return res.status(201).json({
    success: true,
    message: 'Note created successfully',
    data: note,
  });
};

export const getAll = async (
  req: any,
  res: Response
) => {
  const subjectId = req.query.subjectId
    ? Number(req.query.subjectId)
    : undefined;

  const notes = await noteService.getNotes(
    req.user!.id,
    subjectId
  );

  return res.json({
    success: true,
    data: notes,
  });
};

export const getById = async (
  req: any,
  res: Response
) => {
  const note = await noteService.getNoteById(
    Number(req.params.id),
    req.user!.id
  );

  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found',
    });
  }

  return res.json({
    success: true,
    data: note,
  });
};

export const update = async (
  req: any,
  res: Response
) => {
  const note = await noteService.updateNote(
    Number(req.params.id),
    req.user!.id,
    req.body
  );

  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note or subject not found',
    });
  }

  return res.json({
    success: true,
    message: 'Note updated successfully',
    data: note,
  });
};

export const remove = async (
  req: any,
  res: Response
) => {
  const deleted = await noteService.deleteNote(
    Number(req.params.id),
    req.user!.id
  );

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Note not found',
    });
  }

  return res.json({
    success: true,
    message: 'Note deleted successfully',
  });
};