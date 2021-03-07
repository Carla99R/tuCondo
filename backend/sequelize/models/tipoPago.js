const models = require('./index')

module.exports =(sequelize, DataTypes)=>{

    const TipoPago = sequelize.define('tipoPago',{
        tipoPago_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false
        }

    },{timestamps: false});

    return TipoPago
}