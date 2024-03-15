import { routerWrapper } from '@gen-parker/shared-js/util';
import express from 'express';
import moduleController from '../controllers/module.controller.js';

const router = express.Router();

router.post('/sen/sou', (req, res, next) =>
  routerWrapper(req, res, next, moduleController.addSensorData)
);

export default router;
