const express = require('express');
const bodyParser = require('body-parser');
const {Genre, validate} = require("../models/genre");
const jsonParser = bodyParser.json();
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

router.get('/', async(req, res) => {
   // throw new Error('Could not get the genres...');

   const genres = await Genre.find().sort('name');
   res.send(genres);
});

router.post('/', [jsonParser, authMiddleware], async (req, res) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const genre = await Genre.create({name: req.body.name})

   res.send(genre);
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

router.delete('/:id', [jsonParser, authMiddleware, adminMiddleware], async(req, res) => {
   const genre = await Genre.findById(req.params.id);

   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

   await genre.delete();

   res.send(genre);
});

router.get('/:id',[jsonParser, validateObjectId], async(req, res) => {
   const genre = await Genre.findById(req.params.id);

   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

   res.send(genre);
});

module.exports = router;
