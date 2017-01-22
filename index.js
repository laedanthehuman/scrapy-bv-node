const consign       = require('consign'),
      Sequelize     = require('sequelize'),
      TipoBaixador  = require('./enums/tipo-baixador'),
      FileUtils     = require('./utils/fileutils');
require('./utils/function-name');



const async = require('async');
const app ={};
consign({verbose: true}).include("libs/config.js").then("libs/logger.js").then("db.js").into(app);
app.libs.logger.info('Conectando no banco... Pode demorar alguns segundos');
app.db.sequelize.authenticate().then(() => {

    app.libs.logger.info(`Baixador Up em ${new Date()}`);
    app.db.models.configuracaoBaixador.findAll().then((baixadores) => {

        async.each(baixadores, function(configuracao, callback) {
            logica(configuracao);
            callback()
        });

    }, (err) => {
        app.libs.logger.info(`Erro ao pegar os baixadores em ${new Date()}\n ${err}`);
    })
});

function logica(configuracao) {
    app.libs.logger.info(`Executando Configuracao ${configuracao.id}`);
    let tipo = configuracao.tipo;
    if (configuracao.ativo) {
        configuracao.path_destino = FileUtils.normalizePath(configuracao.path_destino);
        const baixador = new TipoBaixador[`${tipo}`](app, TipoBaixador[`${tipo}`].nome, configuracao);
        baixador.logica(baixador).then((log) => {
            app.libs.logger.info(`Configuracao ${configuracao.id} Executada com sucesso!`);
        }, (err) => {
            app.libs.logger.error(`Configuracao ${configuracao.id} Executada com erro: ${err.message}`);
        });
    }
}
module.exports = app;
