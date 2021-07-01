const startupDebugger = require('debug')('app:startup');

const express = require('express');
const app = express();
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

const port = process.env.PORT || 3000;
const server = app.listen(port,() => {
   winston.info(`Listening on ${port}`);
})

module.exports = server;
