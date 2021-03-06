import React, {useReducer, useState, useEffect, useContext} from "react";
import ClientContext from "./clientContext";
import ClientReducer from "./clientReducer";
import {
    SET_USER
}from '../types'


const ClientState = props=>{

    const [info, setInfo] = useState([{}])

    const initialState = {
        correo: "",
        password: "",
        nombre: "",
        apellido: "",
        is_admin : ""
    }

    const [state, dispatch] = useReducer(ClientReducer, initialState);

    const setUser = (data) => {
        dispatch({
            type:SET_USER,
            payload: data
        })
    }

    return (
        <ClientContext.Provider
            value={{
                correo: state.correo,
                password: state.password,
                nombre: state.nombre,
                apellido: state.apellido,
                is_admin: state.is_admin,
                setUser
            }}
        >
            {props.children}
        </ClientContext.Provider>
    )
}

export default ClientState;
