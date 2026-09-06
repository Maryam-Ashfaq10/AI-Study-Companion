import { Router } from "express";

import {
  explainNoteController,
} from "../controllers/ai.controller.js";

const router = Router();

router.post(
  "/notes/:noteId/explain",
  explainNoteController
);

export default router;