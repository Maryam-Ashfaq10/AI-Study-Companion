import { Router } from 'express';

import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

import { create } from '../controllers/subject.controller.js';

import {
  createSubjectSchema,
} from '../validations/subject.validation.js';

const router = Router();

router.post(
  '/create',
  //protect,
  validate(createSubjectSchema),
  create
);

export default router;