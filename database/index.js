const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wherecami');

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

let locationSchema = mongoose.Schema({
  latitude: Number,
  longitude: Number
});

let Location = mongoose.model('Location', locationSchema);

const save = ({latitude, longitude}) => {
  let location = new Location({
    latitude,
    longitude
  });
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
