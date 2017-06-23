var mongoose = require('mongoose');

//creates schema to add in fav list
var Schema = mongoose.Schema({
  Title: {
    type: String,
    unique: true
  },
  Poster: {
    type: String,
    unique: true
  },
  Release_Date: {
    type: String,
    unique: true
  }
});

//creates model
var addtofav = mongoose.model('Addition', Schema);

module.exports = addtofav;
