"use strict";

const Checksum = require('../../utils/checksum'),
    path = require('path'),
    Executor = require('../executor'),
    FileUtils = require('../../utils/fileutils'),
    BaixadorRagna = require('./ragana-baixador');

class Ragana extends Executor {
    constructor(app, tempdir, configuracaoBaixador) {
        super(app, configuracaoBaixador);
        const baixador = new BaixadorRagna(true, app, configuracaoBaixador);
        baixador.setWorkingDir(`Arquivos${path.sep}${tempdir}`);
        FileUtils.mkDir(baixador.workingDir);
        this.file = configuracaoBaixador.pathDestino;
        this.baixador = baixador;
        this.cfg = configuracaoBaixador;
        this.models = app.db.models;
    }

    logica() {
        let Ragana = this;
        return new Promise(function(resolve, reject) {
            Ragana.downloadItem(Ragana);
            let now = new Date();
            Ragana.logger.info('Data Local: ' + now);
            now.setDate(now.getDate() - 7);
            let date = now.getDate() + '/' + now.getMonth() + 1 + '/' + now.getFullYear();
            Ragana.logger.info('Data a procurar: ' + date);

            Ragana.baixador.login().walkToOperacoes().walkToVendas().fillFormVendas(date).downloadFiles().then(() => {
                Ragana.logger.info(`Finalizado download de arquivos da Ragana em ${now}`);
                if (Ragana.file.exists) {
                    throw new Error(`Arquivo já foi Baixado, verifique os arquivos em ${Ragana.cfg.pathDestino}`)
                }
                if (Ragana.file.name.endsWith('.zip')) {
                    Ragana.extrairArquivo(`${Ragana.file.get()}`).then((files) => {
                        Ragana.logger.info(`${Ragana.file.get()} extraido com sucesso`);
                        Ragana.moveFile(files).then((filesMoved) => {
                            Ragana.logger.log('info', `Arquivos Movidos para ${Ragana.cfg.pathDestino}`);
                        }).catch((err) => {
                            Ragana.logger.log('error', 'Erro ao mover arquivos para backup: ' + err);
                            Ragana.service.saveErrorLog(err);
                        })
                    }).catch(err => {
                        Ragana.logger.error(`Falha ao extrair arquivo: ${err}`);
                        Ragana.service.saveErrorLog(err);
                    });
                }
                return resolve(Ragana.service.saveSucessLog(Ragana.file));
            }).catch(function(error) {

                Ragana.logger.error(`Finalizado download de arquivos da Ragana em ${now}`);

                Ragana.service.saveErrorLog({message: `Erro ao finalizar crawler da raganar: ${error}`});
                return reject(error);
            });

        });

    }

    downloadItem(Ragana) {
        this.baixador.on('download', function(downloadItem) {
            Ragana.logger.info('Iniciando download de ' + downloadItem.filename);
            Ragana.logger.info('Download em ' + Ragana.baixador.workingDir);
            var file = `${Ragana.baixador.workingDir}${path.sep}${downloadItem.filename}`;

            Ragana.baixador.download(file, downloadItem);
            let checksumFile = Checksum.generateCheckSum(file);
            Ragana.file = {
                path: Ragana.baixador.workingDir,
                name: downloadItem.filename,
                get: () => {
                    return file
                },
                checksum: checksumFile,
                exists: false
            };
            Ragana.models.log_baixador_sucesso.find({
                where: {
                    checksum: checksumFile
                }
            }).then((log) => {
                if(log){
                    FileUtils.removeFile(file);
                    Ragana.file.exists = true;
                }
            }, (err) => {
                Ragana.logger.error(`Falha ao localizar arquivo com o checksun ${checksumFile} \nErro:${err}`);
                Ragana.service.saveErrorLog({message:`Falha ao localizar arquivo com o checksun ${checksumFile} \nErro:${err}`})
            })

        }, function(state, downloadItem) {
            switch (state) {
                case "interrupted":
                    Ragana.saveErrorLog({message: `Erro no download de ${downloadItem.filename} Download Interrompido`});
                    break;
                case "cancelled":
                    Ragana.logger.error();
                    Ragana.saveErrorLog({message: `Erro no download de ${downloadItem.filename} Download Cancelado`});
                    break;
            }
        });
    }
}

module.exports = Ragana;
