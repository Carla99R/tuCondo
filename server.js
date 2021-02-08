const { ApolloServer } = require("apollo-server-express")
const express = require("express")
const {ApolloServer, gql} = require("apollo-server-express")

// models
const models = require('./backend/sequelize/models/index')

models.sequelize.authenticate().then(() =>{ // conexion BD
    console.log("Conectado a la BD")
})

models.sequelize.sync() // sincroniza modelos con BD



/// --------------

// GraphQL  
// typeDefs
import resolvers from './graphQL/resolvers/resolvers'


const typeDefs = gql`

    type Query{
        hello: String 
    }

`; // no segura si esta comilla

// Resolvers

import typeDefs from './graphQL/typeDefs/typeDefs'

const resolvers = { 

    Query: {
        hello: () => "Hello world"
    }

}

const server = new ApolloServer( { typeDefs, resolvers, context: { models } } )
const app = express();
server.applyMiddleware( {app} );

app.listen( {port: 4000}, () => {
    console.log("Corriendo Servidor Apollo en http://localhost:4000"+server.graphqlPath)

})// no estoy segura si colocar el 4000 asi decia la prepa


