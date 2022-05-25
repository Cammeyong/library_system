const port = process.env.PORT || 8080;
var path = require('path');
var express = require('express');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyparser = require('body-parser');
var mysql = require('mysql');
var app = express();

var conn = require('./lib/db');

var indexRoute = require('./routes/index');
var borrowed_listRoute = require('./routes/borrowed_list');
var loginRoute = require('./routes/login');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({ 
    secret: 'secREt$#code$%3245',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 2*60*1000 }
}))

app.use(flash());

//routing middleware
app.use(loginRoute);
app.use(borrowed_listRoute);
app.use('/', indexRoute);

app.listen(port, () => console.log(`Listening on port ${port}..`));
