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
    apartamento: sequelize.import('./apartamento'),

    pago: sequelize.import('./pago'),
    tipoPago: sequelize.import('./tipoPago'),
    factura: sequelize.import('./factura'),
    estatus: sequelize.import('./estatus')

}

Object.keys(models).forEach(modelName =>{
    if('associate' in models[modelName]){
        models[modelName].associate(models)
    }
})


models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models