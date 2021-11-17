const router = require('express').Router()
const Movie = require('../models/Movie')
const Celebrity = require('../models/Celebrity')

// Show Movies
router.get('/movies', (req, res, next) => {
  Movie.find()
    .populate('cast')
    .then((moviesFromDB) => {
      console.log(moviesFromDB)

      res.render('movies/index', { movieList: moviesFromDB })
    })
    .catch((err) => next(err))
})

// Create Movie
router.get('/movies/new', (req, res, next) => {
  Celebrity.find().then((celebritiesFromDB) => {
    console.log(celebritiesFromDB)

    res.render('movies/newMovie', { celebrities: celebritiesFromDB })
  })
})

router.post('/movies', (req, res, next) => {
  const { title, genre, plot, cast } = req.body

  Movie.create({
    title,
    genre,
    plot,
    cast,
  }).then(() => {
    res.redirect('/movies')
  })
})

// Edit Movie
router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then((movie) => {
      res.render('movies/editMovie', { movie })
    })
})

router.post('/movies/:id/', (req, res, next) => {
  const id = req.params.id
  const { title, genre, plot } = req.body

  Movie.findByIdAndUpdate(id, {
    title,
    genre,
    plot,
  })
    .then(() => {
      res.redirect('/movies}')
    })
    .catch((err) => next(err))
})

// Export Module
module.exports = router
