const models = require('./index')

module.exports =(sequelize, DataTypes)=>{

    const Pago = sequelize.define('pago',{
        pago_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        factura_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: models.factura
        },
        currency:{
            type: DataTypes.STRING,
            allowNull: false
        },
        conversion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        monto_usd:{
            type: DataTypes.STRING,
            allowNull: false
        },
        monto_bss:{
            type: DataTypes.STRING,
            allowNull: false
        },
        tipoPago_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: models.tipoPago
        }


    },{timestamps: false});

    return Pago
}