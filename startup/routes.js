const express = require('express');

const authMiddleware = require('../middleware/auth');
const errorMiddleware = require('../middleware/error');

const auth = require('../routes/auth');
const homeRouter = require('../routes/home');
const customers = require('../routes/customers');
const courses = require('../routes/courses');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');

module.exports = function(app) {
   // Middlewares
   app.use(express.urlencoded({extended: true}));
   app.use(express.static('public'));
   app.use(express.json());
   app.use('/',homeRouter);
   app.use('/api/customers',customers);
   app.use('/api/genres',genres);
   app.use('/api/courses',courses);
   app.use('/api/movies', movies);
   app.use('/api/rentals', rentals);
   app.use('/api/users', users);
   app.use('/api/auth', auth);
   app.use(errorMiddleware);
}
