const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
mongoose.connect('mongodb://localhost/wherecami');

const db = mongoose.connection;


db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

let locationSchema = mongoose.Schema({
  lat: Number,
  lng: Number
});

let Location = mongoose.model('Location', locationSchema);

const save = ({lat, lng}) => {
  let location = new Location({ lat, lng });
  location.save((error, location) => {
    if(error) {
      console.log(error);
    }
  });
}

const findAll = function(callback) {
  Location.find({}, function(err, locations) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, locations);
    }
  });
};

module.exports.save = save;
