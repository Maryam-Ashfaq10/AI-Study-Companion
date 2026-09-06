import type { Response, NextFunction } from "express";

import prisma from "../utils/prisma.js";
import { explainNote } from "../services/ai.service.js";

import {
  protect,
} from "../middleware/auth.middleware.js";

export const explainNoteController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const noteId = Number(req.params.noteId);
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!Number.isInteger(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    const note = await prisma.note.findFirst({
      where: {
        id: noteId,

        subject: {
          userId,
        },
      },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    const explanation = await explainNote({
      title: note.title,
      content: note.content,
    });

    return res.status(200).json({
      success: true,
      data: {
        explanation,
      },
    });
  } catch (error) {
    next(error);
  }
};