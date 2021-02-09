const { gql } = require('apollo-server-express')

const typeDefs = gql` 

    type Usuario{
        usuario_id: Int!,
        nombre: String!,
        apellido: String!,
        cedula: String!,
        correo: String!,
        is_admin: Boolean!,
        eliminado: Boolean!
    }
    
    type Condominio{
        condominio_id: Int!,
        nombre: String!,
        eliminado: Boolean!,
        usuario_id: Int!
    }
    
     type Edificio{
        edificio_id: Int!,
        nombre: String!,
        num_pisos: String!,
        eliminado: Boolean!,
        condominio_id: Int!
    }
    
    type Apartamento{
        apartamento_id: Int!,
        nombre: String!,
        alicuota: String!,
        is_alquilado: Boolean!,
        dimensiones: String!,
        eliminado: Boolean!,
        usuario_id: Int!,
        edificio_id: Int!
    }
    
    
    type Query{
    
        getUsuarios: [Usuario]
        getApartamentos: [Apartamento]
        getEdificios: [Edificio]
        getCondominios: [Condominio]
        
        getUsuario(usuario_id: Int!, cedula: String, correo: String): Usuario
        getApartamento(apartamento_id: Int!, usuario_id: Int, nombre: String): Apartamento
        getCondominio(condominio_id: Int!, usuario_id: Int, nombre: String): Condominio
        getEdificio(edificio_id: Int!, condominio_id: Int, nombre: String): Edificio

        
        deleteApartamento(nombre: String, apartamento_id: Int!, eliminado: Boolean!): Apartamento


    }
    
    type Mutation{
        createUsuario(nombre: String!, apellido: String!, cedula: String!, correo: String!, is_admin: Boolean!, eliminado: Boolean!): Usuario!
        createCondominio(nombre: String!, eliminado: Boolean!, usuario_id: Int!): Condominio!
        createEdificio(nombre: String!, num_pisos: String!,eliminado: Boolean!, condominio_id: Int!): Edificio!
        createApartamento(nombre: String!, alicuota: String!, is_alquilado: Boolean!, dimensiones: String!, eliminado: Boolean!, usuario_id: Int!, edificio_id: Int!): Apartamento!

        deleteUsuario(correo: String, usuario_id: Int!, eliminado: Boolean!):Usuario!
        deleteEdificio(nombre: String, edificio_id: Int!):Edificio!
        deleteCondominio(nombre: String, condominio_id: Int!):Condominio!

    
    }
    
`;

module.exports = typeDefs