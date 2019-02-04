exports.handle400 = (err, req, res, next) => {
  const { code } = err;

  const codes = {
    42703: 'incorrect input post request cannot be processed',
    23503: 'key is not present in the source table',
    23505: 'key value already exist',
    '22P02': 'Invalid input syntax',
  };

  if (codes[code] || err.status === 400) {
    res.status(400).send({ message: codes[code] });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ message: 'Not found' });
  else next(err);
};

exports.handle405 = (req, res, next) => {
  res.status(405).send({ message: 'invalid method for this endpoint' });
};
exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: 'internal server error' });
};
