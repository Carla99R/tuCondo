const { ApolloServer } = require("apollo-server-express")
const express = require("express")
const (ApolloServer, qgl)

const models = require('./backend/sequelize/models/index')

models.sequelize.authenticate().then(() =>{
    console.log("Conectado a la BD")
})

models.sequelize.sync()