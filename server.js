const { ApolloServer } = require("apollo-server-express")
const express = require("express")
const {ApolloServer, qgl} = require("apollo-server-express")

const models = require('./backend/sequelize/models/index')

// GraphQL



models.sequelize.authenticate().then(() =>{ // conexion BD
    console.log("Conectado a la BD")
})

models.sequelize.sync() // sincroniza modelos con BD
