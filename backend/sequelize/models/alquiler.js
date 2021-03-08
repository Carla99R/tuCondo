const models = require('./index')

module.exports =(sequelize, DataTypes)=>{

    const Alquiler = sequelize.define('alquiler',{
        alquiler_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        usuario_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: models.usuario
        },
        tipoAlquiler_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: models.tipoAlquiler
        }
    },{timestamps: false});

    return Alquiler
}