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
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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
	db.user.findOne({
		where: {
			id: req.user.id
		},
		include: [db.character]
	}).then(function(currUser) {
		console.log('\n');
		console.log('\n');
		console.log('\n');
		//console.log(currUser);
		//res.render('profile');
		db.character.findOne({
			where: {
				id: currUser.character.id
			},
			include: [db.quote]
		}).then(function(currChar) {
			//console.log(currChar);
			res.render('profile', {character: currChar})
		}).catch(err => console.log('ERROR'));
	}).catch(err => console.log("ERROR"));
	/*
	db.character.findOne({
		where: {
			id: req.params.id
		},
		include: [db.quote]
	}).then(function(currChar) {
		res.render('character/show', {character: currChar});
	}).catch(function(err) {
		console.log(err);
		res.send("ERROR");
	})
  res.render('profile');
  */
});

app.get('/global', isLoggedIn, function(req, res) {
	db.user.findOne({
		where: {
			id: req.user.id
		},
		include: [db.character]
	}).then(function(currUser) {
		console.log('\n');
		console.log('\n');
		console.log('\n');
		//console.log(currUser);
		//res.render('profile');
		db.character.findOne({
			where: {
				id: currUser.character.id
			},
			include: [db.quote]
		}).then(function(currChar) {
			//console.log(currChar);
			res.render('global', {character: currChar})
		}).catch(err => console.log(err));
	}).catch(err => console.log(err));
});

app.get('/rooms', function(req,res) {
	res.render('rooms');
})
app.post('/rooms', function(req, res) {
	res.redirect(`/rooms/${req.body.name}`)
})
app.get('/rooms/:id', function(req,res) {
	db.user.findOne({
		where: {
			id: req.user.id
		},
		include: [db.character]
	}).then(function(currUser) {
		console.log('\n');
		console.log('\n');
		console.log('\n');
		//console.log(currUser);
		//res.render('profile');
		db.character.findOne({
			where: {
				id: currUser.character.id
			},
			include: [db.quote]
		}).then(function(currChar) {
			//console.log(currChar);
			res.render('chatroom', {data: {character: currChar, room: req.params.id}})
		}).catch(err => console.log(err));
	}).catch(err => console.log(err));
})

app.use('/auth', require('./controllers/auth'));
app.use('/character', isLoggedIn, require('./controllers/character'));

server.listen(process.env.PORT || 3000);

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('chat message', function(msg) {
		io.emit("chat message", msg);
	});
	socket.on('change room', function(room){
		console.log("HERE in change GLOBAL to: " + room)
		socket.join(room);
		socket.on(`${room} message`, function(msg) {
			io.emit(`${room} message`, msg);
		});
	})
	socket.on('disconnect', function() {
		console.log('user disconnect');
	})
})

module.exports = server;
