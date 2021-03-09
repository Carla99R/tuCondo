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
    
    type Pago{
        pago_id: Int!,
        factura_id: Factura!,
        currency: String!,
        conversion: String!,
        monto_usd: String!,
        monto_bss: String!,
        tipoPago_id: Int!,
    }

    type TipoPago{
        tipoPago_id: Int!,
        descripcion: String!
    }
    
    type Factura{
        factura_id: Int!,
        usuario_id: Usuario!,
        monto_total: String!,
        estatus_id: Int!
    }
    
    type Estatus{
        estatus_id: Int!,
        descripcion: String!,
        identificador: String!
    }

    type Alquiler{
        alquiler_id: Int!,
        usuario_id: Int!,
        eliminado: Boolean!,
        tipoAlquiler_id: Int!,
    }

    type TipoAlquiler{
        tipoAlquiler_id: Int!,
        descripcion: String!,
        precio_usd: Int!,
        estatus_id: Int!
    }
    
    
    type Query{
    
        getUsuarios: [Usuario]
        getApartamentos(edificio_id: Int): [Apartamento]
        getEdificios(condominio_id: Int): [Edificio]
        getCondominios(usuario_id: Int): [Condominio]
        getPagos(factura_id: Int): [Pago]
        getFacturas(usuario_id: Int): [Factura]
        getAlquileres(usuario_id: Int): [Alquiler]
        getTipoAlquileres: [TipoAlquiler]
        getEstatus(identificador: String): [Estatus]
        getTipoPago: [TipoPago]


        getUsuario(cedula: String, correo: String): Usuario
        getUsuarioLogin(cedula: String, correo: String, psw: String): Usuario
        getApartamento(edificio_id: Int, nombre: String, usuario_id: Int): Apartamento
        getCondominio(usuario_id: Int, nombre: String): Condominio
        getEdificio(condominio_id: Int, nombre: String): Edificio
        getFactura(factura_id: Int, usuario_id: Int): Factura
        getTipoAlquiler(tipoAlquiler_id: Int, precio_usd: String): TipoAlquiler


    }
    
    type Mutation{
        createUsuario(nombre: String!, apellido: String!, cedula: String!, correo: String!, is_admin: Boolean!, eliminado: Boolean!): Usuario!
        createCondominio(nombre: String!, eliminado: Boolean!, usuario_id: Int!): Condominio!
        createEdificio(nombre: String!, num_pisos: String!,eliminado: Boolean!, condominio_id: Int!): Edificio!
        createApartamento(nombre: String!, alicuota: String!, is_alquilado: Boolean!, dimensiones: String!, eliminado: Boolean!, usuario_id: Int!, edificio_id: Int!): Apartamento!
        createPago(tipoPago_id: Int!, factura_id: Int!, currency: String!, conversion: String!, monto_usd: String!, monto_bss: String!): Pago!
        createFactura(usuario_id: Int!, monto_total: String!): Factura!
        createAlquiler(usuario_id: Int!, tipoAlquiler_id: Int!): Alquiler!


        deleteUsuario(usuario_id: Int!): Usuario!
        deleteCondominio(condominio_id: Int!): Condominio!
        deleteEdificio(edificio_id: Int!):Edificio!
        deleteApartamento(apartamento_id: Int!): Apartamento!
        deleteAlquiler(alquiler_id: Int!): Alquiler!
        deletePago(pago_id: Int!): Pago!



        updateUsuario(usuario_id: Int!, nombre: String, apellido: String, correo: String): Usuario!
        updateCondominio(condominio_id: Int!, nombre: String): Condominio!
        updateEdificio(edificio_id: Int!, nombre: String, num_pisos: Int): Edificio!
        updateApartamento(apartamento_id: Int!, nombre: String, alicuota: String, is_alquilado: Boolean, dimensiones: String): Apartamento!
        updateFactura(factura_id: Int!, estatus_id: Int): Factura!
        updateTipoAlquiler(tipoAlquiler_id: Int!, estatus_id: Int): TipoAlquiler!




    }
    
`;

module.exports = typeDefs
