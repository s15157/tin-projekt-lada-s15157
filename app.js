var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const customerRouter = require('./routes/customerRoute');
const carRouter = require('./routes/carRoute');
const rentRouter = require('./routes/rentRoute');
const userRouter = require('./routes/userRoute');
const customerApiRouter = require('./routes/api/CustomerApiRoute');
const carApiRouter = require('./routes/api/CarApiRoute');
const rentApiRouter = require('./routes/api/RentApiRoute');
const authUtils = require('./util/authUtil');
// const session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

const session = require('express-session');
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
      res.locals.loginError = undefined;
  }
  next();
});

app.use('/', indexRouter);
app.use('/customer', authUtils.permitAuthenticatedUser, customerRouter);
app.use('/car', carRouter);
app.use('/rent', authUtils.permitAuthenticatedUser, rentRouter);
app.use('/register', userRouter);
app.use('/api/customer', customerApiRouter);
app.use('/api/car', carApiRouter);
app.use('/api/rent', rentApiRouter);

app.get('*', function(req, res){
  res.status(404).redirect('/error404');
});

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
