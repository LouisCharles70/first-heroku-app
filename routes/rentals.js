const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const bodyParser = require('body-parser');
const {Customer} = require("../models/customer");
const {Movie} = require("../models/movie");
const {Rental, validate} = require("../models/rental");
const jsonParser = bodyParser.json();
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async(req, res) => {
   const rentals = await Rental
      .find()
      .sort('-dateout')
   ;

   res.send(rentals);
});

router.post('/', jsonParser, async(req, res) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const customer = await Customer.findById(req.body.customerId);
   if(!customer) return res.status(400).send('Customer not found...');

   const movie = await Movie.findById(req.body.movieId)
   if(!movie) return res.status(400).send('Movie not found...');

   if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock...');

   let rental = await Rental.create({
      customer:{
         _id: customer._id,
         name: customer.name,
         phone: customer.phone
      },
      movie: {
         _id: movie._id,
         title: movie.title,
         dailyRentalRate: movie.dailyRentalRate
      }
   })

   console.log("Rental",rental);

   rental.save();

   movie.numberInStock--;
   movie.save();

   return res.send(rental);
});


module.exports = router;
