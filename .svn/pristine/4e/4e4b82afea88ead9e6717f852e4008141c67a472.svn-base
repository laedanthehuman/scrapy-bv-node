const consign       = require('consign'),
      Sequelize     = require('sequelize'),
      express       = require('express'),
      TipoBaixador  = require('./enums/tipo-baixador'),
      FileUtils     = require('./utils/fileutils');




const async = require('async');
const app =express();
consign({verbose: true})
                        .include("libs/config.js")
                        .then("libs/logger.js")
                        .then("db.js")
                        .then("libs/middlewares.js")
                        .then("routes")
                        .then("libs/boot.js")
                        .into(app);
module.exports = app;
