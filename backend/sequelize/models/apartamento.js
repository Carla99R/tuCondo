const models = require('./index')

module.exports =(sequelize, DataTypes)=>{

    const Apartamento = sequelize.define('apartamento',{
        apartamento_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        alicuota:{
            type: DataTypes.STRING,
            allowNull: false
        },
        is_alquilado:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        dimensiones:{
            type: DataTypes.STRING,
            allowNull: false
        },
        eliminado:{
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        usuario_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: models.usuario
        },
        edificio_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: models.edificio
        }


    },{timestamps: false});

    return Apartamento
}