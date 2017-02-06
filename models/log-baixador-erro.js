module.exports = (sequelize, DataType) => {
const LogFalha = sequelize.define('log_baixador_erro',{
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
};
