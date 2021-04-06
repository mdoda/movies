const sequenceGenerator = require('./sequenceGenerator');
const Movie = require('../models/movie');
var express = require('express');
var router = express.Router();

/*************************************************
 * GET LIST OF MOVIES
 *************************************************/
// don't have to repeat /movies because we cannot come to this file id the route is not /movies already
router.get('/', (req, res, next) =>{
  Movie.find()
  .then(movies =>{
   res.status(200).json({
     message: 'Movies fetched successfully!',
     movies: movies
   });
  })
  .catch(error => {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  });
});

/*************************************************
 * GET SINGLE MOVIE
 *************************************************/
router.get('/:id', (req, res, next) =>{
  Movie.findOne({
    'id': req.params.id
  })
  .then(movie =>{
   res.status(200).json({
     message: 'Movie fetched successfully!',
     movie: movie
   });
  })
  .catch(error => {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  });
});

/*************************************************
 * POST MOVIE
 *************************************************/
router.post('/',(req,res,next)=>{
  const maxMovieId = sequenceGenerator.nextId("movies")

  const movie = new Movie({
    id: maxMovieId,
    title: req.body.title,
    year: req.body.year,
    rating: req.body.rating,
    minutes: req.body.minutes,
    genre: req.body.genre,
    imageUrl: req.body.imageUrl
  });

  movie.save().then(createdMovie => {
    res.status(201).json({
      message: 'Movie added successfully',
      movie: createdMovie
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  });
});

/*************************************************
 * UPDATE MOVIE
 *************************************************/
router.put('/:id', (req, res, next) =>{
  Movie.findOne({id: req.params.id})
  .then(movie =>{
    movie.title     = req.body.title,
    movie.year    = req.body.year,
    movie.minutes    = req.body.minutes,
    movie.genre    = req.body.genre,
    movie.imageUrl = req.body.imageUrl,

    Movie.updateOne({id:req.params.id}, movie)
    .then(result => {
      console.log('result: ', result)
      res.status(200).json({
        message:'Movie updated successfully',
        movie: movie
      })
    })
    .catch(error =>{
      res.status(500).json({
        message:'An error occurred',
        error: error
      });
    });
  })
  .catch(error =>{
    res.status(500).json({
      message:'An error occurred',
      error: error
    });
  });
});

/*************************************************
 * DELETE MOVIE
 *************************************************/
router.delete('/:id', (req, res, next) =>{
  Movie.findOne({ id: req.params.id})
  .then(movie => {
    Movie.deleteOne({id: req.params.id})
    .then(result => {
      res.status(204).json({
        message: "Movie deleted successfully"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    })
  })
  .catch(error => {
    res.status(500).json({
      message: 'Movie not found.',
      error: { movie: 'Movie not found'}
  });
});
});

module.exports = router;
