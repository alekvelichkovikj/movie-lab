const router = require('express').Router()
const Celebrity = require('../models/Celebrity')

// Show Celebrities
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      // console.log(celebritiesFromDB)

      res.render('celebrities/index', { celebrityList: celebritiesFromDB })
    })
    .catch((err) => next(err))
})

// Create Celebrities Cast Error Workaround
router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/newCelebrity')
})

// Show Celebrity Details
router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebritiesFromDB) => {
      res.render('celebrities/show', { celebrity: celebritiesFromDB })
    })
    .catch((err) => next(err))
})

// Create Celebrities
router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchphrase } = req.body

  Celebrity.create({
    name,
    occupation,
    catchphrase,
  }).then((createdCeleb) => {
    res.redirect(`/celebrities/${createdCeleb._id}`)
  })
})

// Delete Celebrities
router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch((err) => {
      next(err)
    })
})

// Edit Celebrities
router.get('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id).then((celebrity) => {
    res.render('celebrities/editCelebrities', { celebrity })
  })
})

router.post('/celebrities/:id', (req, res, next) => {
  const id = req.params.id
  const { name, occupation, catchphrase } = req.body

  Celebrity.findByIdAndUpdate(
    id,
    {
      name,
      occupation,
      catchphrase,
    },
    { new: true }
  )
    .then((updatedCeleb) => {
      res.redirect(`/celebrities/${updatedCeleb._id}`)
    })
    .catch((err) => next(err))
})

// Export Module
module.exports = router
