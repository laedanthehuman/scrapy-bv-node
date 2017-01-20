
module.exports = (sequelize, DataType) => {
    const LogSucesso = sequelize.define('logBaixadorSucesso',{
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        data:{
            type:DataType.DATE,
        },
        nome_arquivo:{
            type:DataType.STRING
        },
        checksum:{
            type:DataType.STRING
        }

    });


    return LogSucesso;
}
