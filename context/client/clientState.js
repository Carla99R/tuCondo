import React, {useReducer, useState, useEffect, useContext} from "react";
import ClientContext from "./clientContext";
import { SET_USER } from "../types";
import clientReducer from "./clientReducer";

const ClientState = props=>{

    const [info, setInfo] = useState([{}])

    const initialState = {
        correo: "",
        password: "",
        nombre: "",
        apellido: "",
        isAdmin : ""
    }

    const [state, dispatch] = useReducer(clientReducer, initialState);

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
                isAdmin: state.isAdmin,
                setUser
            }}
        >
            {props.children}
        </ClientContext.Provider>
    )
}

export default ClientState;
