require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const path = require('path');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();

const PORT = 3500;

//Router

const router = require('./routes/root');
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');

// imports

const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const { logEvents } = require('./middleware/logger');
const connectDB = require('./config/dbConn');
connectDB();

// Middlewares

server.use(logger);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());
server.use(cors());
server.use('/', express.static(path.join(__dirname, 'public')));

// Routes
server.use('/', router);
server.use('/users', userRouter);
server.use('/notes', noteRouter);

server.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ msg: "Could not find the resource you're looking for" });
  } else {
    res.type('txt').send("404, Could not find the resource you're looking for");
  }
});
server.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('connected to db');
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log'
  );
});
