const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express')


const models = require('./backend/sequelize/models/index')

//Models
models.sequelize.authenticate().then(() =>{ // conexion BD
    console.log("Conectado a la BD")
})

models.sequelize.sync() // sincroniza modelos con BD



// GraphQL
//TypeDefinitios
const typeDefs = gql` 

    type Query{
        hello : String
    }
`;


//Resolver
const resolvers = {
    Query : {
        hello: ()=> "Hello World"
    }
}


const server = new ApolloServer({typeDefs, resolvers, context: {models}})
const app = express();
server.applyMiddleware({app});

app.listen({port: 4000}, () => {
    console.log("Corriendo servidor Apollo en http://localhost:4000" + server.graphqlPath)
})
