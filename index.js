const startupDebugger = require('debug')('app:startup');

const express = require('express');
const app = express();

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
   res.header("Access-Control-Allow-Headers", "*");
   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
   next();
});

require('./startup/routes')(app);
const winston = require('winston');

require('./startup/db')();

require('./startup/logging')();
require('./startup/validation')();
require("./startup/prod")(app);

const morgan = require("morgan");
if(app.get('env')==='development'){
   app.use(morgan('tiny'));
   startupDebugger("Morgan enabled");
}

const port = process.env.PORT || 3900;
const server = app.listen(port,() => {
   winston.info(`Listening on ${port}`);
})

module.exports = server;
