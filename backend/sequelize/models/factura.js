const models = require('./index')

    module.exports =(sequelize, DataTypes)=>{

        const Factura = sequelize.define('factura',{
            factura_id:{
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
            monto_total:{
                type: DataTypes.STRING,
                allowNull: false
            },
            estatus_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: models.estatus
            }

        },{timestamps: false});

        return Factura

}

