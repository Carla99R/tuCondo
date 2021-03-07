const models = require('./index')

module.exports =(sequelize, DataTypes)=>{

    const Noticia = sequelize.define('noticia',{
        noticia_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        mensaje:{
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

    return Noticia
}