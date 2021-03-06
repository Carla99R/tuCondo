import { SET_USER } from "../types";

export default (state, action) => {
    const {type, payload} = action;

    switch(type){
        case SET_USER:
            return {
                ...state,
                nombre: payload.nombre,
                apellido: payload.apellido,
                is_admin: payload.is_admin,
                correo: payload.correo,
                cedula: payload.cedula

            }
        default:
            return state;
    }
}
