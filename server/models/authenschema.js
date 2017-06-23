var mongoose = require('mongoose');

//creates schema for new account
var Schema = mongoose.Schema({
  FirstName: String,
  LastName: String,
  UserName: {
    type: String,
    unique: true
  },
  Password: String,
  Country: String,
  Gender: String,
  Phone: {
    type: String,
    unique: true
  }
});

//creates model
var acc = mongoose.model('Account', Schema);

module.exports = acc;
