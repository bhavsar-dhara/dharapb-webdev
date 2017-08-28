var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var app = express();

app.set('view engine', 'ejs');

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000 || 8080;

// 2 different ways of instantiating assignment
// require ("./assignment/app.js")(app);
/*var assignment = require ("./assignment/app.js");
assignment(app);*/

require ("./project/app.js")(app);
 
// require("./experiments/todos.server.js")(app);

// require('./lectures/ejs/hello/app.js')(app);
// require('./wam/app.js')(app);

app.listen(port, ipaddress);
