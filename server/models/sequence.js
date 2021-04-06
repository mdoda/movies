const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxMovieId:  Number
});

module.exports = mongoose.model('Sequence', sequenceSchema);
