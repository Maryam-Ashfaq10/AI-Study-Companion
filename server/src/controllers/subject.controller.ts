import type { Request, Response } from 'express';

import * as subjectService from '../services/subject.service.js';

export const create = async (
  req: any,
  res: Response
) => {
  try {
    const subject = await subjectService.createSubject(
      req.user!.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data: subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to create subject',
    });
  }
};

export const getAll = async (req: any, res: Response) => {
  const subjects = await subjectService.getSubjects(req.user!.id);

  res.json({
    success: true,
    data: subjects,
  });
};

export const getById = async (req: any, res: Response) => {
  const subject = await subjectService.getSubjectById(
    Number(req.params.id),
    req.user!.id
  );

  if (!subject) {
    return res.status(404).json({
      success: false,
      message: 'Subject not found',
    });
  }

  res.json({
    success: true,
    data: subject,
  });
};

export const update = async (req: any, res: Response) => {
  const subject = await subjectService.updateSubject(
    Number(req.params.id),
    req.user!.id,
    req.body
  );

  if (!subject) {
    return res.status(404).json({
      success: false,
      message: 'Subject not found',
    });
  }

  res.json({
    success: true,
    message: 'Subject updated successfully',
    data: subject,
  });
};

export const remove = async (req: any, res: Response) => {
  const deleted = await subjectService.deleteSubject(
    Number(req.params.id),
    req.user!.id
  );

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Subject not found',
    });
  }

  res.json({
    success: true,
    message: 'Subject deleted successfully',
  });
};