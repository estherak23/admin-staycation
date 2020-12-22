var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//untuk method override
const methodOverride = require('method-override');



//untuk exspress sessio dan connect flash
const session = require('express-session');
const flash = require('connect-flash');

//import mongoose
const mongoose =require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/db_staycation', 
{useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// router admin
const adminRouter = require('./routes/admin');


//router untuk api
const apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mengguunakan omethod override
app.use(methodOverride('_method'));

//untuk express sesion
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))


//untuk connect flash
app.use(flash());



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//untuk boothstarpnya
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));

// admin
app.use('/admin', adminRouter);


//api
app.use('/api/v1/member', apiRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
