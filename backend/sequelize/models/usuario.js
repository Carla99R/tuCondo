module.exports =(sequelize, DataTypes)=>{

    const Usuario = sequelize.define('usuario',{
        usuario_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cedula:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        correo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        isdmin:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }


    },{});
    return Usuario
}