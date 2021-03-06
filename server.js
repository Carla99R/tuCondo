//TypeDefinitions
const typeDefs = require('./backend/graphQl/typeDefs/typeDefs')
//Resolver
const resolvers = require('./backend/graphQl/resolvers/resolvers')



const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express')


const models = require('./backend/sequelize/models/index')

//Models
models.sequelize.authenticate().then(() =>{ // conexion BD
    console.log("Conectado a la BD")
})

models.sequelize.sync() // sincroniza modelos con BD



// GraphQL


const server = new ApolloServer({typeDefs, resolvers, context: {models}})
const app = express();
server.applyMiddleware({app});

app.listen({port: 9500}, () => {
    console.log("Corriendo servidor Apollo en http://localhost:9200" + server.graphqlPath)
})
