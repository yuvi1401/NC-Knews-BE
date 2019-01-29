const app = require('express')();
const apiRouter = require('./routes/api');

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  if (err) console.log(err);
});

module.exports = app;
