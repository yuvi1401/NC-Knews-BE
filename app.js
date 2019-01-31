const app = require('express')();
const bodyparser = require('body-parser');
const apiRouter = require('./routes/api');
const { handle400, handle404 } = require('./error');

app.use(bodyparser.json());

app.use('/api', apiRouter);
app.use('/*', (req, res, next) => next({ status: 404, message: 'Route not found' }));
// app.use((err, req, res, next) => {
//   if (err) console.log(err);
// });

app.use(handle400);
app.use(handle404);
module.exports = app;
