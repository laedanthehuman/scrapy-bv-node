class Service {
    constructor(app,cfg) {
        this.models = app.db.models;
        this.logger = app.libs.logger;
        this.configuracaoBaixador = cfg;
    }
    salvaSucesso(log) {
        let logSucesso = this.models.log_baixador_sucesso.build(log);
        return logSucesso.save();
    }

    salvaErro(log) {
        let logErro = this.models.log_baixador_erro.build(log);
        return logErro.save();
    }

    saveSucessLog() {
        var checksumArquivo = Checksum.generateCheckSum(`${this.file.get()}`);
        var now = new Date().toString();
        var log = {
            data: now,
            nome_arquivo: this.file.name,
            checksum: checksumArquivo,
            configuracao_baixador_id: this.configuracaoBaixador.id
        };

        this.salvaSucesso(log).then((log) => {
            this.logger.info(`Download de ${log.nome_arquivo} em ${log.data} com checksum ${log.checksum} Salvo com sucesso`);
            return log;
        }).catch(err => {
            this.logger.error(`Erro ao salvar o log ${err}`);
            saveErrorLog(err);
        });
    }

    saveErrorLog(erro) {
        this.logger.error(`${erro.message}`);
        var now = new Date().toString();
        var log = {
            data: now,
            erro: erro.message,
            configuracao_baixador_id: this.configuracaoBaixador.id
        };
        this.models.log_baixador_erro.destroy({
            where: {
                configuracao_baixador_id: this.configuracaoBaixador.id
            },
            truncate: true
        }).then(rows => {
            this.salvaErro(log).then((log) => {
                this.logger.info(`Erro ${erro} salvo com sucesso!`);
            }).catch(err => {
                this.logger.error(`Erro ao salvar o log ${err}`);
            });
        });

    }
}
module.exports = Service;
