const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = mongoose.Schema({
  username: String,
  password: String,
  config: { photo: String, required: false }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
