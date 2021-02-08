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
        }


    },{});
    return Apartamento
}