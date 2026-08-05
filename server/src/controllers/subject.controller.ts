import type { Request, Response } from 'express';

import { createSubject } from '../services/subject.service.js';

export const create = async (
  req: any,
  res: Response
) => {
  try {
    const subject = await createSubject(
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