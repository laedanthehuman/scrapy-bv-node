module.exports = (sequelize, DataType) => {
    const LogSucesso = sequelize.define('log_baixador_sucesso', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        data: {
            type: DataType.DATE
        },
        nome_arquivo: {
            type: DataType.STRING
        },
        checksum: {
            type: DataType.STRING
        },
        configuracao_baixador_id:{
            type:DataType.INTEGER,
            notNull: true,
        }


    });
    return LogSucesso;

};
