const routerWrapper = (req, res, next, service) => {
  res.contentType('application/json');

  return Promise.resolve(req)
    .then(service)
    .then(res.status(200).send.bind(res))
    .catch(next);
};

export { routerWrapper };
