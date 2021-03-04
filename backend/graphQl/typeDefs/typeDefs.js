const { gql } = require('apollo-server-express')

const typeDefs = gql` 

    type Usuario{
        usuario_id: Int!,
        nombre: String!,
        apellido: String!,
        cedula: String!,
        correo: String!,
        is_admin: Boolean!,
        eliminado: Boolean!,
        psw: String!
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
        
        getUsuario(cedula: String, correo: String): Usuario
        getUsuarioLogin(cedula: String, correo: String, psw: String): Usuario
        getApartamento(edificio_id: Int, nombre: String): Apartamento
        getCondominio(usuario_id: Int, nombre: String): Condominio
        getEdificio(condominio_id: Int, nombre: String): Edificio

    }
    
    type Mutation{
        createUsuario(nombre: String!, apellido: String!, cedula: String!, correo: String!, is_admin: Boolean!, eliminado: Boolean!): Usuario!
        createCondominio(nombre: String!, eliminado: Boolean!, usuario_id: Int!): Condominio!
        createEdificio(nombre: String!, num_pisos: String!,eliminado: Boolean!, condominio_id: Int!): Edificio!
        createApartamento(nombre: String!, alicuota: String!, is_alquilado: Boolean!, dimensiones: String!, eliminado: Boolean!, usuario_id: Int!, edificio_id: Int!): Apartamento!


        deleteUsuario(usuario_id: Int!): Usuario!
        deleteCondominio(condominio_id: Int!): Usuario!
        deleteEdificio(edificio_id: Int!):Edificio!
        deleteApartamento(apartamento_id: Int!): Apartamento!
        
        
        updateUsuario(usuario_id: Int!, nombre: String, apellido: String, correo: String): Usuario!
        updateCondominio(condominio_id: Int!, nombre: String): Condominio!
        updateEdificio(edificio_id: Int!, nombre: String, num_pisos: Int): Edificio!
        updateApartamento(apartamento_id: Int!, nombre: String, alicuota: String, is_alquilado: Boolean, dimensiones: String): Apartamento!



    }
    
`;

module.exports = typeDefs
