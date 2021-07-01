const express = require('express');
const bodyParser = require('body-parser');
const {Customer, validate} = require("../models/customer");
const jsonParser = bodyParser.json();
const router = express.Router();

//Get customers
router.get('/', async(req, res) => {
   const customers = await Customer.find().sort('name');

   res.send(customers);
});

//Create customer
router.post('/', jsonParser, async(req, res) => {
   const { error } = validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   let customer = new Customer({
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
   })

   customer = await customer.save();
   return res.send(customer);
});

//Update customer
router.put('/:id', jsonParser, async(req, res) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);


   const customer = await Customer.findById(req.params.id);

   if (!customer) return res.status(404).send('The customer with the given ID was not found.');

   customer.name = req.body.name;
   customer.phone = req.body.phone;
   customer.isGold = req.body.isGold;

   await customer.save();

   res.send(customer);
});

router.delete('/:id', jsonParser, async(req, res) => {
   const customer = await Customer.findById(req.params.id);

   if (!customer) return res.status(404).send('The customer with the given ID was not found.');

   await customer.delete();

   res.send(customer);
});

router.get('/:id',jsonParser, async(req, res) => {
   const customer = await Customer.findById(req.params.id);

   if (!customer) return res.status(404).send('The customer with the given ID was not found.');

   res.send(customer);
});

module.exports = router;
