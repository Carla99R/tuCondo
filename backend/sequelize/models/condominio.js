const models = require('./index')

module.exports =(sequelize, DataTypes)=>{

    const Condominio = sequelize.define('condominio',{
        condominio_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        eliminado:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        usuario_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: models.usuario
        }

    },{timestamps: false});

    return Condominio
}