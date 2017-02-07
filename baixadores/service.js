const Checksum = require('../utils/checksum');
class Service {
    constructor(app, cfg) {
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

    saveSucessLog(file) {
        var now = new Date().toString();
        var log = {
            data: now,
            nome_arquivo: file.name,
            checksum: file.checksum,
            configuracao_baixador_id: this.configuracaoBaixador.id
        };

        this.salvaSucesso(log).then((log) => {
            this.logger.info(`Download de ${log.nome_arquivo} em ${log.data} com checksum ${log.checksum} Salvo com sucesso`);
            return log;
        }).catch(err => {
            this.logger.error(`Erro ao salvar o log ${err}`);
            this.saveErrorLog(err);
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

        this.salvaErro(log).then((log) => {
            this.logger.info(`Erro ${erro} salvo com sucesso!`);
        }).catch(err => {
            this.logger.error(`Erro ao salvar o log ${err}`);
        });
        throw new Error(erro.message);

    }
}
module.exports = Service;
