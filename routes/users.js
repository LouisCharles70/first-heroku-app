const express = require('express');
const bodyParser = require('body-parser');
const {User, validate} = require("../models/user");
const jsonParser = bodyParser.json();
const router = express.Router();
const _ = require('lodash');
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/auth");

router.post('/', jsonParser, async(req, res) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({email: req.body.email});
   if(user) return res.status(400).send('User already registered !');

   user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
   })

   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);

   await user.save();

   const token = user.generateAuthToken()

   res
      .header('x-auth-token', token)
      .send(_.pick(user, ['_id','name','email']));
});

router.get('/me', [jsonParser, authMiddleware], async(req, res) => {
   const user = await User.findById(req.user._id).select('-password');

   return res.send(user);
})

module.exports = router;
