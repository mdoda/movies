const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  id:            {type: String, required: true},
  title:         {type: String, required: true},
  year:          {type: String, required: true},
  rating:        {type: String, required: true},
  minutes:       {type: String, required: true},
  genre:         {type: String, required: true},
  imageUrl:      {type: String, required: false}
});

module.exports = mongoose.model('Movie', movieSchema);
// we use the export because we want to use the model outside of this file
