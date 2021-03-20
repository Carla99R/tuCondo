const models = require('./index')

module.exports =(sequelize, DataTypes)=>{

    const TipoPago = sequelize.define('tipoPago',{
        tipo_pago_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        currency:{
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },{timestamps: false});

    return TipoPago
}