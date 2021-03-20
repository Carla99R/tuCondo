const { ArrowForwardTwoTone } = require("@material-ui/icons")

const resolvers ={

    Query: {
        async getUsuarios(root, args, {models}) {
            return models.usuario.findAll()
        },

        async getUsuarioLogin(root, args, {models}) {
            if (!args.cedula && args.correo) {
                return models.usuario.findOne({
                    where: {
                        correo: args.correo,
                        eliminado: false,
                        psw: args.psw
                    }
                })
            } else if (args.cedula && !args.correo) {
                return models.usuario.findOne({
                    where: {
                        cedula: args.cedula,
                        eliminado: false,
                        psw: args.psw
                    }
                })
            }else if(args.cedula && args.correo){
                return models.usuario.findOne({
                    where: {
                        cedula: args.cedula,
                        correo: args.correo,
                        eliminado: false,
                        psw: args.psw
                    }
                })
            }
        },
        async getUsuario(root, args, {models}) {
            if (!args.cedula && args.correo) {
                return models.usuario.findOne({
                    where: {
                        correo: args.correo,
                        eliminado: false
                    }
                })
            } else if (args.cedula && !args.correo) {
                return models.usuario.findOne({
                    where: {
                        cedula: args.cedula,
                        eliminado: false
                    }
                })
            }else if(args.cedula && args.correo){
                return models.usuario.findOne({
                    where: {
                        cedula: args.cedula,
                        correo: args.correo,
                        eliminado: false
                    }
                })
            }else if(args.usuario_id){
                return models.usuario.findOne({
                    where: {
                        usuario_id: args.usuario_id,
                        eliminado: false
                    }
                })
            }
        },

        async getCondominios(root, args, {models}) {
            return models.condominio.findAll({
                where:{
                    usuario_id: args.usuario_id,
                    eliminado: false
                }
            })
        },

        async getCondominio(root, args, {models}) {
            if (args.usuario_id && !args.nombre) {
                return models.condominio.findOne({
                    where: {
                        usuario_id: args.usuario_id,
                        eliminado: false
                    }
                })

            } else if (args.nombre && !args.usuario_id) {
                return models.condominio.findOne({
                    where: {
                        nombre: args.nombre,
                        eliminado: false
                    }
                })

            }else if(args.nombre && args.usuario_id){
                return models.condominio.findOne({
                    where: {
                        usuario_id: args.usuario_id,
                        nombre: args.nombre,
                        eliminado: false
                    }
                })
            }
        },

        async getEdificios(root, args, {models}) {
            return models.edificio.findAll({
                where:  {
                    condominio_id: args.condominio_id,
                    eliminado: false
                }
            })
        },

        async getEdificio(root, args, {models}) {
            if (args.condominio_id && !args.nombre) {
                return models.edificio.findOne({
                    where: {
                        condominio_id: args.condominio_id,
                        eliminado: false
                    }
                })
            } else if (args.nombre && !args.condominio_id) {
                return models.edificio.findOne({
                    where: {
                        nombre: args.nombre,
                        eliminado: false
                    }
                })
            } else if (args.nombre && args.condominio_id) {
                return models.edificio.findOne({
                    where: {
                        condominio_id: args.condominio_id,
                        nombre: args.nombre,
                        eliminado: false
                    }
                })
            }
        },

        async getApartamentos(root, args, {models}) {
            if(args.edificio_id && !args.usuario_id){
                return models.apartamento.findAll({
                    where:  {
                        edificio_id: args.edificio_id,
                        eliminado: false
                    }
                })
            }else if(!args.edificio_id && args.usuario_id){
                return models.apartamento.findAll({
                    where:  {
                        usuario_id: args.usuario_id,
                        eliminado: false
                    }
                })
            }
        },

        async getApartamento(root, args, {models}) {
            if (args.edificio_id && !args.nombre) {
                return models.apartamento.findOne({
                    where: {
                        edificio_id: args.edificio_id,
                        eliminado: false
                    }
                })
            } else if (args.nombre && !args.edificio_id) {
                return models.apartamento.findOne({
                    where: {
                        nombre: args.nombre,
                        eliminado: false
                    }
                })

            } else if (args.nombre && args.usuario_id) {
                return models.apartamento.findOne({
                    where: {
                        usuario_id: args.usuario_id,
                        nombre: args.nombre,
                        eliminado: false
                    }
                })

            }else if(args.usuario_id){
                return models.apartamento.findOne({
                    where: {
                        usuario_id: args.usuario_id,
                        eliminado: false
                    }
                })
            }

        },
        async getPagos(root, args, {models}) {
            if(args.factura_id){
                return models.pago.findAll({
                    where:{
                        factura_id: args.factura_id
                    }
                })
            }else{
                return models.pago.findAll()
            }
        },

        async getFacturas(root, args, {models}) {
            return models.factura.findAll({
                where:{
                    apartamento_id: args.apartamento_id
                }
            })
        },

        async getFactura(root, args, {models}) {
            if (args.estatus_id) {
                return models.factura.findOne({
                    where: {
                        estatus_id: args.estatus_id,
                        apartamento_id: args.apartamento_id
                    }
                })
            }
        },
        async getEstatus(root, args, {models}) {
            return models.estatus.findAll({
                where:{
                    identificador: args.identificador
                }
        })},

        async getTipoPago(root, args, {models}) {
            return models.tipoPago.findOne({
                where:{
                    tipo_pago_id: args.tipo_pago_id
                }
            })
        },

        async getTipoPagos(root, args, {models}) {
            return models.tipoPago.findAll()
        },

        async getGastos(root, args, { models }) {
            return models.gasto.findAll()
        },

        async getGastoEdificios(root, args, { models }) {
            return models.gastoEdificio.findAll({
                where: {
                    eliminado: false
                }
            })
        },

        async getGastoApartamentos(root, args, { models }) {
            return models.gastoApartamento.findAll({
                where: {
                    eliminado: false
                }
            })
        },

        async getGasto(root, args, { models }) {
            return models.gasto.findAll({
                where: {
                    factura_id: args.factura_id
                }
            })
        },

        async getGastoEdificio(root, args, { models }) {
            return models.gastoEdificio.findOne({
                where: {
                    edificio_id: args.edificio_id,
                    eliminado: false
                }
            })
        },

        async getGastoApartamento(root, args, { models }) {
            return models.gastoApartamento.findAll({
                where: {
                    apartamento_id: args.apartamento_id,
                    eliminado: false
                }
            })
        },

        async getTipoAlquiler(root, args, {models}) {
            if(args.precio_usd){
                return models.tipoAlquiler.findOne({
                    where:{
                        tipoAlquiler_id: args.tipoAlquiler_id,
                        precio_usd: args.precio_usd
                    }
                })
            }else if(!args.precio_usd){
                return models.tipoAlquiler.findOne({
                    where:{
                        tipoAlquiler_id: args.tipoAlquiler_id
                    }
                })
            }

        },

        async getTipoAlquileres(root, args, {models}) {
            return models.tipoAlquiler.findAll()
        },

        async getAlquileres(root, args, {models}) {
                return models.alquiler.findAll({
                    where:{
                        usuario_id: args.usuario_id,
                        eliminado: false
                    }
                })
            }

    },
    Mutation: {
        async createUsuario(root, {nombre, apellido, is_admin, correo, cedula},{models}){
            return await models.usuario.create({nombre, apellido, is_admin, correo, cedula})
        },
        async createCondominio(root, {nombre, usuario_id},{models}){
            return await models.condominio.create({nombre, usuario_id})
        },
        async createEdificio(root, {nombre, num_pisos, condominio_id},{models}){
            return await models.edificio.create({nombre, num_pisos, condominio_id})
        },
        async createApartamento(root, {nombre, alicuota, is_alquilado, dimensiones, usuario_id, edificio_id},{models}){
            return await models.apartamento.create({nombre, alicuota, is_alquilado, dimensiones, usuario_id, edificio_id})
        },

        async createPago(root, {tipo_pago_id, factura_id, comprobante, monto},{models}){
            return await models.pago.create({tipo_pago_id, factura_id, comprobante, monto})
        },

        async createFactura(root, {apartamento_id, monto_total},{models}){
            return await models.factura.create({apartamento_id, monto_total})
        },

        async createAlquiler(root, {usuario_id, tipoAlquiler_id},{models}){
            return await models.alquiler.create({usuario_id, tipoAlquiler_id})
        },

        async createTipoPago(root, { descripcion, currency }, { models }) {
            return await models.tipoPago.create({ descripcion, currency })
        },

        async createGasto(root, { descripcion, factura_id }, { models }) {
            return await models.gasto.create({ descripcion, factura_id })
        },

        async createGastoEdificio(root, { gasto_id, edificio_id, monto_edificio }, { models }) {
            return await models.gastoEdificio.create({ gasto_id, edificio_id, monto_edificio })
        },
        
        async createGastoApartamento(root, { gasto_id, apartamento_id, monto_apartamento }, { models }) {
            return await models.gastoApartamento.create({ gasto_id, apartamento_id, monto_apartamento })
        },




        async deleteUsuario(root, args, {models}){

            const eliminado = {
                eliminado: true
            };
            console.log(eliminado)
            await models.usuario.update(eliminado, {where: {usuario_id:args.usuario_id}})
            return models.usuario.findByPk(args.usuario_id)
        },

        async deleteCondominio(root, args, {models}){

            const eliminado = {
                eliminado: true
            };
            console.log(eliminado)
            await models.condominio.update(eliminado, {where: {condominio_id:args.condominio_id}})
            return models.condominio.findByPk(args.condominio_id)
        },

        async deleteEdificio(root, args, {models}){

            const eliminado = {
                eliminado: true
            };
            console.log(eliminado)
            await models.edificio.update(eliminado, {where: {edificio_id:args.edificio_id}})
            return models.edificio.findByPk(args.edificio_id)
        },

        async deleteApartamento(root, args, {models}){

            const eliminado = {
                eliminado: true
            };
            console.log(eliminado)
            await models.apartamento.update(eliminado, {where: {apartamento_id:args.apartamento_id}})
            return models.apartamento.findByPk(args.apartamento_id)
        },

        async deleteAlquiler(root, args, {models}){
            const eliminado = {
                eliminado: true
            };
            console.log(eliminado)
            await models.alquiler.update(eliminado, {where: {alquiler_id:args.alquiler_id}})
            return models.alquiler.findByPk(args.alquiler_id)
        },

        async deleteFactura(root, args, { models }) {     // TODO al seleccionar el factura puedo obtener el condominio_id

            const eliminado = {
                estatus_id: 7
            };
            console.log(eliminado)
            await models.factura.update(eliminado, { where: { factura_id: args.factura_id } })
            return models.factura.findByPk(args.factura_id)
        },

        async deleteGastoEdificio(root, args, { models }) {     // TODO al seleccionar el factura puedo obtener el condominio_id
            
            const eliminado = {
                eliminado: true
            };

            await models.gastoEdificio.update(eliminado, { where: { gasto_id: args.gasto_id, edificio_id: args.edificio_id} })
            return models.gastoEdificio.findOne({ where: { gasto_id: args.gasto_id, edificio_id: args.edificio_id }})
       
                   },

        
        async deleteGastoApartamento(root, args, { models }) {     // TODO al seleccionar el factura puedo obtener el condominio_id

            const eliminado = {
                eliminado: true
            };
            console.log(eliminado)
            await models.gastoApartamento.update(eliminado, { where: { gasto_id: args.gasto_id, apartamento_id: args.apartamento_id} })
            return models.gastoApartamento.findOne({ where: { gasto_id: args.gasto_id, apartamento_id: args.apartamento_id } })
        },




        async updateUsuario(root, args, {models}){   //TODO en la vista de perfil de usuario cuando ya esta loggeado, ahi saco el usuario_id

            const actualizacion = {
                nombre:args.nombre,
                apellido:args.apellido,
                correo:args.correo
            };
            console.log(actualizacion)
            await models.usuario.update(actualizacion, {where: {usuario_id:args.usuario_id, eliminado: false}})
            return models.usuario.findByPk(args.usuario_id)
        },

        async updateCondominio(root, args, {models}){

            const actualizacion = {
                nombre:args.nombre
            };
            console.log(actualizacion)
            await models.condominio.update(actualizacion, {where: {condominio_id:args.condominio_id, eliminado: false}}) //TODO el condominio_id lo obtengo cuando selecciono el condominio a modificar y le doy a modificar, ahi se ejecuta el getCondominio
            return models.condominio.findByPk(args.condominio_id)
        },

        async updateEdificio(root, args, {models}){

            const actualizacion = {
                nombre:args.nombre,
                num_pisos:args.num_pisos
            };
            console.log(actualizacion)
            await models.edificio.update(actualizacion, {where: {edificio_id:args.edificio_id, eliminado: false}}) //TODO el edificio_id lo obtengo cuando selecciono el edificio a modificar y le doy a modificar, ahi se ejecuta el getEdificio
            return models.edificio.findByPk(args.edificio_id)
        },

        async updateApartamento(root, args, {models}){

            const actualizacion = {
                nombre:args.nombre,
                alicuota:args.alicuota,
                is_alquilado:args.is_alquilado,
                dimensiones:args.dimensiones
            };
            console.log(actualizacion)
            await models.apartamento.update(actualizacion, {where: {apartamento_id:args.apartamento_id, eliminado: false}}) //TODO el apartamento_id lo obtengo cuando selecciono el apartamento a modificar y le doy a modificar, ahi se ejecuta el getApartamento
            return models.apartamento.findByPk(args.apartamento_id)
        },

        async updateFactura(root, args, {models}){

            const actualizacion = {
                estatus_id:args.estatus_id
            };
            console.log(actualizacion)
            await models.factura.update(actualizacion, {where: {factura_id:args.factura_id}})
            return models.factura.findByPk(args.factura_id)
        },

        async updateTipoAlquiler(root, args, {models}){

            const actualizacion = {
                estatus_id:args.estatus_id
            };
            console.log(actualizacion)
            await models.tipoAlquiler.update(actualizacion, {where: {tipoAlquiler_id:args.tipoAlquiler_id}})
            return models.tipoAlquiler.findByPk(args.tipoAlquiler_id)
        },
    }

}

module.exports = resolvers
