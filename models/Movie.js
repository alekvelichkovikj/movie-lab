const mongoose = require('mongoose')
const Schema = mongoose.Schema
const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: {
      type: Schema.Types.ObjectId,
      // this is the name of the model that the _id refers to
      ref: 'Celebrity',
    },
  },
  {
    timestamps: true,
  }
)

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie
