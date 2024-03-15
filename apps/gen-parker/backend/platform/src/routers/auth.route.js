import { routerWrapper } from '@gen-parker/shared-js/util';
import express from 'express';
import { moduleSignup } from '../controllers/auth.controller.js';
const router = express.Router();

router.get('/mod/sign/', (req, res, next) =>
  routerWrapper(req, res, next, moduleSignup)
);

export default router;
