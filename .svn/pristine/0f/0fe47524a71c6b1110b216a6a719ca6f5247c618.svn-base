const bodyParser    = require('body-parser'),
      express       = require('express'),
      cors          = require('cors'),
      morgan        = require('morgan'),
      logger        = require('./logger'),
      compression   = require('compression'),
      helmet        = require('helmet');

module.exports = app => {
    app.set('json spaces', 4);
    app.set("port", 3000);
    app.use(morgan("common",{
        stream:{
            write: (msg) =>{
                logger.info(msg);
            }
        }
    }));
    app.use(helmet());
    app.use(cors({
        methods:["GET","POST"],
    }));
    app.use(compression());
    app.use(bodyParser.json());
};
