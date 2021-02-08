const resolvers = {
    Query: {
        
        async getUsuarios(root,args, {models}){
        
            return await models.usuarios.findAll()
        },
        async getUsuario(root,args, {models}){

            return await models.usuario.findByPk(args.id)
        } /** no segura si mayuscula */

    }, 
    Mutation:{
        async crearUsuario(root, {nombre, apellido, cedula, correo, isadmin} , {models}){

            return models.usuario.crearUsuario({nombre, apellido, cedula, correo, isadmin}): usuario
        }
    }

}

module.exports = resolvers