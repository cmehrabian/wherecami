const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/locations');

let locationSchema = mongoose.Schema({
});

let Location = mongoose.model('Location', locationSchema);

let save = () => {
}

module.exports.save = save;
