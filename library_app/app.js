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

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));


var indexRoute = require('./routes/index');
var student_registerRoute = require('./routes/student_register');
var borrowed_listRoute = require('./routes/borrowed_list');
var book_requestRoute = require('./routes/book_request');
var loginRoute = require('./routes/login');
var library_booksRoute = require('./routes/library_books');


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
app.use(library_booksRoute);
app.use(student_registerRoute);
app.use(loginRoute);
app.use(borrowed_listRoute);
app.use(book_requestRoute),
app.use('/', indexRoute);

app.listen(port, () => console.log(`Listening on port ${port}..`));
