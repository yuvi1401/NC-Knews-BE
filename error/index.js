exports.handle400 = (err, req, res, next) => {
  // console.log(err);
  const codes = ['42703'];

  if (codes.includes(err.code)) {
    res.status(400).send({ message: '400: BAD REQUEST' });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  console.log(err);
  if (err.status === 404) res.status(404).send({ message: '404: Route does not exist' });
  else next(err);
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: 'internal server error' });
};
