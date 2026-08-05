import { Router } from 'express';

import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

import * as subjectController from '../controllers/subject.controller.js';

import {
  createSubjectSchema, updateSubjectSchema, subjectIdSchema
} from '../validations/subject.validation.js';

const router = Router();
router.use(protect);

router.post(
  '/create',
  validate(createSubjectSchema),
  subjectController.create
);

router.get('/all', subjectController.getAll);

router.get(
  '/:id',
  validate(subjectIdSchema),
  subjectController.getById
);

router.put(
  '/update/:id',
  validate(updateSubjectSchema),
  subjectController.update
);

router.delete(
  '/del/:id',
  validate(subjectIdSchema),
  subjectController.remove
);
export default router;