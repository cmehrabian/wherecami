const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/items');

let itemSchema = mongoose.Schema({
});

let Item = mongoose.model('Item', locationSchema);

let save = () => {
}

module.exports.save = save;
