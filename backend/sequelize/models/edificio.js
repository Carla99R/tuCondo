module.exports =(sequelize, DataTypes)=>{

    const Edificio = sequelize.define('edificio',{
        edificio_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        num_pisos:{
            type: DataTypes.STRING,
            allowNull: false
        }


    },{});
    return Edificio
}