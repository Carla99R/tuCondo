const models = require('./index')

module.exports =(sequelize, DataTypes)=>{

    const Estatus = sequelize.define('estatus',{
        estatus_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        identificador:{
            type: DataTypes.STRING,
            allowNull: false
        },

    },{timestamps: false});

    return Estatus
}