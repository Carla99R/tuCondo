const resolvers ={

    Query: {
        async getUsuarios(root, args, {models}) {
            return models.usuario.findAll()
        },

        async getUsuario(root, args, {models}) {
            if (!args.cedula && args.correo) {
                return models.usuario.findOne({
                    where: {
                        usuario_id: args.usuario_id,
                        correo: args.correo,
                        eliminado: false
                    }
                })
            } else if (args.cedula && !args.correo) {
                return models.usuario.findOne({
                    where: {
                        usuario_id: args.usuario_id,
                        cedula: args.cedula,
                        eliminado: false
                    }
                })
            } else if (!args.cedula && !args.correo) {
                return models.condominio.findOne({
                    where: {
                        usuario_id: args.usuario_id,
                        eliminado: false
                    }
                })
            } else {
                return models.usuario.findOne({
                    where: {
                        usuario_id: args.usuario_id,
                        cedula: args.cedula,
                        correo: args.correo,
                        eliminado: false
                    }
                })
            }

        },

        async getCondominios(root, args, {models}) {
            return models.condominio.findAll()
        },

        async getCondominio(root, args, {models}) {
            if (args.usuario_id && !args.nombre) {
                return models.condominio.findOne({
                    where: {
                        condominio_id: args.condominio_id,
                        usuario_id: args.usuario_id,
                        eliminado: false
                    }
                })

            } else if (args.nombre && !args.usuario_id) {
                return models.condominio.findOne({
                    where: {
                        condominio_id: args.condominio_id,
                        nombre: args.nombre,
                        eliminado: false
                    }
                })

            } else if (!args.nombre && !args.usuario_id) {
                return models.condominio.findOne({
                    where: {
                        condominio_id: args.condominio_id,
                        eliminado: false
                    }
                })
            } else {
                return models.condominio.findOne({
                    where: {
                        condominio_id: args.condominio_id,
                        usuario_id: args.usuario_id,
                        nombre: args.nombre,
                        eliminado: false
                    }
                })
            }
        },

        async getEdificios(root, args, {models}) {
            return models.edificio.findAll()
        },

        async getEdificio(root, args, {models}) {
            if (args.condominio_id && !args.nombre) {
                return models.edificio.findOne({
                    where: {
                        edificio_id: args.edificio_id,
                        condominio_id: args.condominio_id,
                        eliminado: false
                    }
                })
            } else if (args.nombre && !args.condominio_id) {
                return models.edificio.findOne({
                    where: {
                        edificio_id: args.edificio_id,
                        nombre: args.nombre,
                        eliminado: false
                    }
                })
            } else if (!args.nombre && !args.condominio_id) {
                return models.edificio.findOne({
                    where: {
                        edificio_id: args.edificio_id,
                        eliminado: false
                    }
                })
            } else {
                return models.edificio.findOne({
                    where: {
                        edificio_id: args.edificio_id,
                        condominio_id: args.condominio_id,
                        nombre: args.nombre,
                        eliminado: false
                    }
                })
            }
        },

        async getApartamentos(root, args, {models}) {
            return models.apartamento.findAll()
        },

        async getApartamento(root, args, {models}) {
            if (args.usuario_id && !args.nombre) {
                return models.apartamento.findOne({
                    where: {
                        apartamento_id: args.apartamento_id,
                        usuario_id: args.usuario_id,
                        eliminado: false
                    }
                })
            } else if (args.nombre && !args.usuario_id) {
                return models.apartamento.findOne({
                    where: {
                        apartamento_id: args.apartamento_id,
                        name: args.nombre,
                        eliminado: false
                    }
                })

            } else if (!args.nombre && !args.usuario_id) {
                return models.apartamento.findOne({
                    where: {
                        apartamento_id: args.apartamento_id,
                        eliminado: false
                    }
                })

            } else {
                return models.apartamento.findOne({
                    where: {
                        apartamento_id: args.apartamento_id,
                        usuario_id: args.usuario_id,
                        nombre: args.nombre,
                        eliminado: false
                    }
                })
            }
        },

        async deleteApartamento(root, args, {models}) {

             models.apartamento.update({eliminado: args.eliminado}, {
                where: {
                    nombre: args.nombre,
                    apartamento_id: args.apartamento_id
                }
            })

            return models.apartamento.findOne({
                where: {
                    apartamento_id: args.apartamento_id,
                    nombre: args.nombre
                }
            })

        },



    },
    Mutation: {
        async createUsuario(root, {nombre, apellido, is_admin, correo, cedula, eliminado},{models}){
            return await models.usuario.create({nombre, apellido, is_admin, correo, cedula, eliminado})
        },
        async createCondominio(root, {nombre, eliminado, usuario_id},{models}){
            return await models.condominio.create({nombre, eliminado, usuario_id})
        },
        async createEdificio(root, {nombre, eliminado, num_pisos, condominio_id},{models}){
            return await models.edificio.create({nombre, eliminado, num_pisos, condominio_id})
        },
        async createApartamento(root, {nombre, eliminado, alicuota, is_alquilado, dimensiones, usuario_id, edificio_id},{models}){
            return await models.apartamento.create({nombre, eliminado, alicuota, is_alquilado, dimensiones, usuario_id, edificio_id})
        },




        async deleteUsuario(root, args,{models}){
            return await models.usuario.update({ eliminado: args.eliminado }, { set: args })
        },
        async deleteEdificio(root, {nombre, edificio_id},{models}){
            return await models.edificio.update({eliminado:true})
        },
        async deleteCondominio(root, {nombre, condominio_id},{models}){
            return await models.condominio.update({eliminado:true})
        },




    }

}

module.exports = resolvers