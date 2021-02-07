import React, {useReducer, useState, useEffect, useContext} from "react";
import clientContext from "./clientContext";

const ClientState = props=>{

    const [info, setInfo] = useState([{}])

    const initialState = {
        correo: "",
        password: "",
        nombre: "",
        apellido: "",
        isAdmin : ""
    }

    const [state, dispatch] = useReducer(clientReducer, initialState)

}