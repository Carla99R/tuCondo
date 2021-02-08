const { gql } = require('apollo-server-express')

const typeDefs = gql` 

    type Usuario{
        usuario_id: Int!,
        nombre: String!,
        apellido: String!,
        cedula: String!,
        correo: String!,
        is_admin: Boolean!
    }
    
    type Condominio{
        condominio_id: Int!,
        nombre: String!,
    }
    
     type Edificio{
        edificio_id: Int!,
        nombre: String!,
        num_pisos: String!,
    }
    
    type Apartamento{
        apartamento_id: Int!,
        nombre: String!,
        alicuota: String!,
        is_alquilado: Boolean!,
        dimensiones: String!,
    }
    
    
    type Query{
    
        getUsuarios: [Usuario]
        getUsuario(usuario_id: Int!): Usuario
        getCondominio(usuario_id: Int!): Condominio
        getEdificios(condominio_id: Int!): [Edificio]
        getApartamentos(edificio_id: Int, usuario_id: Int): [Apartamento]
    
    }
    
    type Mutation{
        createUsuario(nombre: String!, apellido: String!, cedula: String!, correo: String!, is_admin: Boolean!): Usuario!
        createCondominio(nombre: String!): Condominio!
        createEdificio(nombre: String!, num_pisos: String!): Edificio!
        createApartamento(nombre: String!, alicuota: String!, is_alquilado: Boolean!, dimensiones: String!): Apartamento!

    
    }
    
`;

module.exports = typeDefs