import http from 'http';
import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';

import { exceptionHandling, NotFound } from '@gen-parker/shared-js/util';


import authRoute from './auth.route.js';
import moduleRoute from './module.route.js';
import loggerRoute from './logger.route.js';

const app = express();
const httpPort = 59595;

const server = http.createServer(app);

app.set('trust proxy', true);

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
  })
);

app.use((req, res, next) => {
  console.log(`[${uuid()}] ${req.method} ${req.url}`);
  express.json()(req, res, (outcome) => {
    if (outcome && outcome.status >= 400 && outcome.status <= 500) {
      res.sendStatus(500).end();
      throw new Error(`${outcome.type} ${outcome.body}`);
    }
    next(outcome);
  });
});


app.use(authRoute);
app.use(moduleRoute);
app.use(loggerRoute);

app.use((_, __, next) => {
  next(new NotFound("Page is not found. Please check the url you've entered."));
});

app.use(exceptionHandling);

server.listen(httpPort, () => {
  console.log(`Listening at http://localhost:${httpPort}`);
});
