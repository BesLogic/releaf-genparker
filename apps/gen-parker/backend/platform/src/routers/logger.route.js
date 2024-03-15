import { routerWrapper } from '@gen-parker/shared-js/util';
import express from 'express';
import { logEvent } from '../controllers/logger.controller.js';
const router = express.Router();

router.post('/log/mess', (req, res, next) =>
  routerWrapper(req, res, next, logEvent)
);

export default router;
