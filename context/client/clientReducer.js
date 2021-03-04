import { SET_USER } from "../types";

export default (state, action) => {
    const {type, payload} = action;

    switch(type){
        case SET_USER:
            return {
                ...state,
                nombre: payload.nombre
            }
        default:
            return state;
    }
}
