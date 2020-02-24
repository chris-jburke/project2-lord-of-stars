require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const db = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.use(helmet());

const sessionStore = new SequelizeStore({
	db: db.sequelize,
	expiration: 1000 * 60 * 30
});

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	store: sessionStore
}));

sessionStore.sync();

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req,res,next) {
	res.locals.alerts = req.flash();
	res.locals.currentUser = req.user;
	next();
});

app.get('/', function(req, res) {
	console.log(`User is ${req.user ? req.user.name : 'user is not logged'}`)
	res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/', isLoggedIn, require('./controllers/test'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
