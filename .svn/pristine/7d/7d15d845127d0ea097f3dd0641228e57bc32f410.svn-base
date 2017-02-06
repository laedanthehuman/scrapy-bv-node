"use strict";

const Checksum      = require('../utils/checksum'),
      FileUtils     = require('../utils/fileutils'),
      ExtractUtils  = require('../utils/extract'),
      Service       = require('./service'),
      copy          = require('copy'),
      path          = require('path');


class Executor {
    constructor(app, configuracaoBaixador) {
        this.libs = app.libs;
        this.service = new Service(app,configuracaoBaixador);
        this.logger = this.libs.logger;
        this.configuracaoBaixador = configuracaoBaixador;
    }


    extrairArquivo(file) {
        let Executor = this;
        ExtractUtils.extractFile(file, this.baixador.workingDir).then((files) => {
            this.logger.info(`${this.file.get()} extraido com sucesso`);
            let Executor = this;
            Executor.moveFile(Executor, files).then((filesMoved) => {
                Executor.logger.log('info', `Arquivos Movidos para ${Executor.configuracaoBaixador.path_destino}`);
                FileUtils.removeFile(this.baixador.workingDir);
            }).catch((err) => {
                Executor.logger.log('error', 'Erro ao mover arquivos para backup: ' + err);
                Executor.service.saveErrorLog(err);
            })
        }).catch(err => {
            Executor.logger.error(`Falha ao extrair arquivo: ${err}`);
            service.saveErrorLog(err);
        });
    }
    moveFile(Executor, files) {
        return new Promise(function(resolve, reject) {
            copy.each(files, Executor.configuracaoBaixador.path_destino, function(err, files) {
                if (err) {
                    return reject(err);
                }
                return resolve(files);
            });
        });
    }

}

module.exports = Executor;
