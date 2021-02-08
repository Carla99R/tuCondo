const {gql} = require('apollo-server-express')

const typeDefs = gql` 

type Usuario{ /* No estoy segura si mayuscula*/
    id: Int!, /* No estoy segura si con esa mayuscula*/
    nombre: String!,
    apellido: String!,
    cedula!,
    correo!,
    isadmin! /* No estoy segura si isAdmin o isadmin */

    type Query (
        getUsuarios: [Usuario],
        getUsuario(id: Int!): Usuario
    )

    type Mutation(){
        crearUsuario(nombre: String!, apellido: String!, cedula:  String!, correo:  String!, isadmin: String!): Usuario! 
    }
}

`/*No estoy segura si comilla correcta*/ 
