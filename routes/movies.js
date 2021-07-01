const express = require('express');
const bodyParser = require('body-parser');
const {Genre} = require("../models/genre");
const {Movie, validate} = require("../models/movie");
const jsonParser = bodyParser.json();
const router = express.Router();

router.get('/', async(req, res) => {
   const movies = await Movie.find().sort('name');

   res.send(movies);
});

router.post('/', jsonParser, async(req, res) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const genre = await Genre.findById(req.body.genreId)
   if(!genre) return res.status(400).send('Invalid genre.');

   const movie = await Movie.create({
      title: req.body.title,
      genre: new Genre({
         _id: genre._id,
         name: genre.name
      }),
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
   })

   res.send(movie);
});

router.put('/:id', jsonParser, async(req, res) => {
   const genre = await Genre.findById(req.params.id);

   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   genre.name = req.body.name;
   await genre.save();

   res.send(genre);
});

router.delete('/:id', jsonParser, async(req, res) => {
   const genre = await Genre.findById(req.params.id);

   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

   await genre.delete();

   res.send(genre);
});

router.get('/:id',jsonParser, async(req, res) => {
   const genre = await Genre.findById(req.params.id);

   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

   res.send(genre);
});



module.exports = router;
