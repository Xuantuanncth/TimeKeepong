var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const session = require('express-session');
const bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var infoRouter = require('./routes/info_user');
var registerRouter = require('./routes/register_user');
var viewRouter = require('./routes/view_data');


var app = express();

// setup session
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
    cookie: { maxAge: oneDay }
}))

// view engine setup
const layout = path.join(__dirname + '/views/layout');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(layout)

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/info', infoRouter);
app.use('/view', viewRouter);
app.use('/register', registerRouter);




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
