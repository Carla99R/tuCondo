const models = require('./index')

module.exports =(sequelize, DataTypes)=>{

    const Factura = sequelize.define('factura',{
        factura_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        apartamento_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: models.apartamento
        },
        monto_total:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        estatus_id:{
            type: DataTypes.STRING,
            allowNull: true,
            foreignKey: true,
            references: models.estatus
        }

    },{timestamps: false});

    return Factura
}