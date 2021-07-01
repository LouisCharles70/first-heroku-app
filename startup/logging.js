const winston = require('winston');
require('express-async-errors');
require('winston-mongodb');
const config = require("config");

module.exports = function(){
   process.on("unhandledRejection",(ex) => {
      throw ex;
   })

   winston.add(new winston.transports.File({filename: 'logfile.log'}));
   winston.add(new winston.transports.MongoDB({
      db: config.get("db"),
      level: "error",
      options: {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         authSource: "admin"
      }
   }));
   winston.exceptions.handle(
      new winston.transports.Console({
         colorize: true,
         prettyPrint: true
      }),
      new winston.transports.File({ filename: 'uncaughtExceptions.log' })
   );

   winston.stream({ start: -1 }).on('log', function(log) {
      // console.log(log.level + ': ' + log.message);
   });
}
