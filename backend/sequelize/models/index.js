//Conexion con BD

import Sequelize from 'sequelize'

const sequelize = new Sequelize('bw7tqizybep4admvmlft', 'ustwyqqfenyhghpo', '3PvX9AsdWmUzlgTiKCyH',{
        host: 'bw7tqizybep4admvmlft-mysql.services.clever-cloud.com',
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