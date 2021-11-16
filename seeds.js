const mongoose = require('mongoose')
const Celebrity = require('./models/Celebrity')

// connection to Mongo
mongoose.connect('mongodb://localhost/movies')

const celebrities = [
  {
    name: 'Brad Pit',
    occupation: 'Actor',
    catchphrase: 'Gorlami',
  },
  {
    name: 'Christoph Waltz',
    occupation: 'Actor',
    catchphrase: 'Au revoir, Shoshanna!',
  },
  {
    name: 'Michael Fassbender',
    occupation: 'Actor',
    catchphrase:
      'You know, fighting in a basement offers a lot of difficulties... Number one being, you’re fighting in a basement!',
  },
]

Celebrity.insertMany(celebrities)
  .then(() => {
    console.log('Success')
    mongoose.connection.close()
  })
  .catch((err) => console.log(err))
