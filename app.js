const app = require('express')();
const bodyparser = require('body-parser');
const apiRouter = require('./routes/api');

app.use(bodyparser.json());

app.use('/api', apiRouter);
app.use((err, req, res, next) => {
  if (err) console.log(err);
});

module.exports = app;
