import { jsonStringifyRecursive } from '../json';

export const exceptionHandling = (err, req, res, _) => {
  if (err.errorCode) {
    res.status(err.errorCode);
  } else {
    res.status(500);
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(jsonStringifyRecursive(err.message.toString()));
};
