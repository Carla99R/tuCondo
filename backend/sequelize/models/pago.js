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
        comprobante:{
            type: DataTypes.STRING,
            allowNull: false
        },
        monto:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        tipo_pago_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: models.tipoPago
        }


    },{timestamps: false});

    return Pago
}