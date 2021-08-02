const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
 
require('dotenv').config()

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var schoolsRouter = require('./routes/schools');
var gamesRouter = require('./routes/games');
var scoresRouter = require('./routes/scores');
var galleryRouter = require('./routes/gallery');

var app = express();

// setup sessions for auth
app.use(session({ secret: 'mysecretasdf1234' }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(function(req, res, next) {
  res.locals.url = req.originalUrl

  next()
})

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/schools', schoolsRouter);
app.use('/games', gamesRouter);
app.use('/scores', scoresRouter);
app.use('/gallery', galleryRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
