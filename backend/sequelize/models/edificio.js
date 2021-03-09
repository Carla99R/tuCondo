const models = require('./index')

module.exports =(sequelize, DataTypes)=>{

    const Edificio = sequelize.define('edificio',{
        edificio_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        num_pisos:{
            type: DataTypes.STRING,
            allowNull: false
        },
        eliminado:{
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        condominio_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: models.condominio
        }


    },{timestamps: false});

    return Edificio
}