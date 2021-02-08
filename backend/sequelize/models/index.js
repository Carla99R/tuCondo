//Conexion con BD

import Sequelize from 'sequelize'

const sequelize = new Sequelize('tucondo', 'root', 'Carlyta99!!',{
        host: '127.0.0.1',
        port:'3307',
        dialect: 'mysql'
})

const models ={
    usuario: sequelize.import('./usuario'),
    edificio: sequelize.import('./edificio'),
    condominio: sequelize.import('./condominio'),
    apartamento: sequelize.import('./apartamento')

}

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models