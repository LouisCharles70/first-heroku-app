const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require("./genre");

const movieSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255
   },
   genre: {
      type: genreSchema,
      required: true
   },
   numberInStock:{
      type: Number,
      default: 0,
      min: 0,
      max: 255
   },
   dailyRentalRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 255
   }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
   const schema = {
      title: Joi.string()
         .min(5)
         .max(50)
         .required(),
      numberInStock: Joi.number()
         .min(0),
      dailyRentalRate: Joi.number()
         .min(0),
      genreId: Joi.objectId().required()
   };

   return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.movieSchema = movieSchema;
module.exports.validate = validateMovie;
