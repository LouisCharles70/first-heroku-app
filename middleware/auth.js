const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next){
   //Retrieve the token
   const token = req.header('x-auth-token');
   if(!token) return res.status(401).send("Access denied. No token provided.");

   try{
      req.user = jwt.verify(token, config.get('jwtPrivateKey'));
      next();
   } catch (exception) {
      res.status(400).send('Invalid token...');
   }
}

module.exports = auth;
