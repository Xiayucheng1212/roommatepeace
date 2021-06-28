require('dotenv').config()
require('../config.js');
const express = require('express');

const userRouter = require('./routers/users.js');
const notificationRouter = require('./routers/notifications.js');
const complainRouter = require('./routers/complains.js');
const roomRouter = require('./routers/rooms.js');
const loginRouter = require('./routers/login.js');
const requestLogger = require('./middleware/request-logger.js');
const errorHandler = require('./middleware/error-handler.js');
const accessController = require('./middleware/access-controller.js');
const uploadImage = require('./routers/uploadimage.js');

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
app.use(express.json({limit : "50mb"}));

app.use('/user', userRouter);
app.use('/notification', notificationRouter);
app.use('/complain', complainRouter);
app.use('/room', roomRouter);
app.use('/log', loginRouter);
app.use('/uploadimage', uploadImage);
app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}...`);
});
