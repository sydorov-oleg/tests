const express = require('express');

const morgan = require('morgan');

const tourRouter = require('./routes/tourRouters');
const userRouter = require('./routes/userRouters');

const app = express();
// ===== Middlewares =====================================================
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the Middleware 🖐');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
