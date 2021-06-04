require('../config.js');
const express = require('express');

const userRouter = require('./routers/users.js');
const todoRouter = require('./routers/todo.js');
const requestLogger = require('./middleware/request-logger.js');
const errorHandler = require('./middleware/error-handler.js');
const accessController = require('./middleware/access-controller.js');

const app = express();

// app.use(requestLogger); // debug only

app.use(
  express.static('dist', {
    setHeaders: (res, path, stat) => {
      res.set('Cache-Control', 'public, s-maxage=86400');
    },
  })
);
app.use(accessController); // Allows cross-origin HTTP requests

app.use('/user', userRouter);
app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}...`);
});
