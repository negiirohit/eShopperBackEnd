var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
// DataBase Configuration
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
//importing Routers
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const productRouter = require('./routes/productRouter');


//Db Connectio 
const url = config.mongoURL
const connect = mongoose.connect(url, {
   useNewUrlParser: true
  });

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });



//express app
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//BodyParser MiddleWare
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Initiallize passport
app.use(passport.initialize());
app.use(cors());
//Using Routers in app module
app.use('/', indexRouter);
app.use('/users',userRouter);
app.use('/products',productRouter);

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
