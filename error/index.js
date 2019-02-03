exports.handle400 = (err, req, res, next) => {
  // console.log(err);
  const { code } = err;
  // console.log(code);
  const codes = {
    42703: 'incorrect input post request cannot be processed',
    23503: 'key is not present in the source table',
    23505: 'key value already exist',
    '22P02': 'Invalid input syntax',
  };
  // console.log(codes[code]);
  if (codes[code] || err.status === 400) {
    res.status(400).send({ message: codes[code] });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  // console.log(err);
  if (err.status === 404) res.status(404).send({ message: 'Not found' });
  else next(err);
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: 'internal server error' });
};
