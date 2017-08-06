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
  lng: Number,
  created_at: { type: Date, default: Date.now }
});

let Location = mongoose.model('Location', locationSchema);

const save = ({lat, lng}) => {
  let location = new Location({ lat, lng });
  console.log('in DATABASE!', location);
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

const findLatest = function(callback) {
  Location.findOne()
    .sort({created_at: -1})
    .exec(function(err, location) {
      if (err) {
        throw err;
      } else {
        callback(location);
      }
    });
  // Location.find({}, function(err, locations) {
  //   if(err) {
  //     callback(err, null);
  //   } else {
  //     callback(null, locations);
  //   }
  // });
};

module.exports.save = save;
module.exports.findAll = findAll;
module.exports.findLatest = findLatest;
