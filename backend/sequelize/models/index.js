//Conexion con BD

import Sequelize from 'sequelize'

const sequelize = new Sequelize('bw7tqizybep4admvmlft', 'ustwyqqfenyhghpo', '3PvX9AsdWmUzlgTiKCyH',{
        host: 'bw7tqizybep4admvmlft-mysql.services.clever-cloud.com',
        dialect: 'mysql'
})

const models ={
    usuario: sequelize.import('./usuario')
}

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models