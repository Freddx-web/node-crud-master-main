var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var productRouter = require('./routes/productos');
var usersRouter = require('./routes/usuarios');
var authRouter = require('./routes/authRouter');
var storageRouter = require('./routes/storageRouter');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Ruters
app.use('/' , indexRouter)
app.use('/auth', authRouter);
app.use('/productos', productRouter);
app.use('/usuarios', usersRouter);
app.use('/store', storageRouter);


// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404).render('error' , {
    message: 'ERORR',
  }));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error' , {
    message: 'ERORR',
  });
});

module.exports = app;
