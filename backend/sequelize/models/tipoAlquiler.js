const models = require('./index')

module.exports =(sequelize, DataTypes)=>{

    const TipoAlquiler = sequelize.define('tipoAlquiler',{
        tipoAlquiler_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        precio_usd:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estatus_id:{
            type: DataTypes.INTEGER,
            allowNull: true,
            foreignKey: true,
            references: models.estatus
        },

    },{timestamps: false});

    return TipoAlquiler
}