"use strict";

const path = require('path'),
      Executor = require('../executor'),
      FileUtils = require('../../utils/fileutils'),
      BaixadorRagna  = require('./ragana-baixador');

class ExecutorRagana extends Executor {

    constructor(app,tempdir,cfg) {
        super(app,cfg);
        const baixador = new BaixadorRagna(true,app,cfg);
        baixador.setWorkingDir(`temp${path.sep}${tempdir}`);
        FileUtils.mkDir(baixador.workingDir);
        this.file = '';
        this.baixador = baixador;
    }



}
