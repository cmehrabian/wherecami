const express = require('express');
const bodyParser = require('body-parser');
const database = require('../database');
const { save } = require('../database/index.js');


const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../database/models/user');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('express-session')({
    secret: 'Rusty is the best and cutest dog in the world',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    if (user) {
      done(null, user.get());
    } else {
      done(null, null);
    }
  });
});

app.use(express.static(__dirname + '/../client/dist'));


app.get('/location', function (req, res) {
});

// fetch all locations
app.get('/locations', (req, res) => {
  database.findAll((locations) => {
    res.json(locations);
  });
});

app.post('/location', function (req, res) {
  let location = req.body;
  database.save(location);
});

app.get('/secret', isLoggedIn, function(req, res){
  res.end('secret');
});

app.get('/isLoggedIn', function(req, res) {
  if(req.isAuthenticated()){
    res.json(true);
  } else {
    res.json(false);
  }
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.end('Not logged in.');
}


app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('sucess');
    res.redirect('/');
  });

//handling user sign up
app.post('/register', function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(error, user){
    if(error){
      res.json(false);
    }
    passport.authenticate('local')(req, res, function(){
      let { username, _id } = user;
      res.json({ isLoggedin: true, user: { _id, username } });
    });
  });
});

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
