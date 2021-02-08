module.exports =(sequelize, DataTypes)=>{

    const Condominio = sequelize.define('condominio',{
        condominio_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        }


    },{});
    return Condominio
}