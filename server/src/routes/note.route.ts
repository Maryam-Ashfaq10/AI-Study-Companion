import { Router } from 'express';

import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from '../controllers/note.controller.js';

import {
  createNoteSchema,
  updateNoteSchema,
  noteIdSchema,
} from '../validations/note.validation.js';

const router = Router();

router.use(protect);

router.get('/all', getAll);

router.get(
  '/:id',
  validate(noteIdSchema),
  getById
);

router.post(
  '/create',
  validate(createNoteSchema),
  create
);

router.put(
  '/:id',
  validate(updateNoteSchema),
  update
);

router.delete(
  '/:id',
  validate(noteIdSchema),
  remove
);

export default router;