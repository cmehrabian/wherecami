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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.static(__dirname + '/../client/dist'));


app.get('/location', function (req, res) {
});

app.post('/location', function (req, res) {
  let location = req.body;
  database.save(location);
});

app.get('/secret', isLoggedIn, function(req, res){
  res.end('secret');
});

app.get('isLoggedIn', function(req, res) {
  if(req.isAuthenticated()){

  } else {

  }
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.end('Not logged in.');
}

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
});

//handling user sign up
app.post('/register', function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(error, user){
    if(error){
      console.log(error);
      console.log('it errors here');
      res.end(error);
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('secret');
    });
  });
});

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
