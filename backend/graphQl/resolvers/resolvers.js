const resolvers ={

    Query:{
        async getUsuarios(root, args, {models}){
            return models.usuario.findAll()
        },
        async getUsuario(root, args, {models}){
            return await models.usuario.findByPk(args.usuario_id)
        },
    },
    Mutation: {
        async createUsuario(root, {nombre, apellido, is_admin, correo, cedula},{models}){
            return await models.usuario.create({nombre, apellido, is_admin, correo, cedula})
        }
    }

}

module.exports = resolvers