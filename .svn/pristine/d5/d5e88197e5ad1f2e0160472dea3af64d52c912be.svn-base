
module.exports = (sequelize, DataType) => {
    const LogFalha = sequelize.define('logBaixadorErro',{
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        data:{
            type:DataType.DATE,
        },
        erro:{
            type:DataType.STRING(1000)
        }

    });
    return LogFalha;
}
