import React, { useEffect, useState} from 'react';
import styles from '../styles/adminCondominios.module.css'
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {useForm} from "react-hook-form";
import NavbarInicio from "../components/navbarInicio";
import Image from "next/image";
import { DataGrid } from '@material-ui/data-grid';

const Solicitudes =()=> {

    const [ nombre, setNombre ] = useState(localStorage.getItem('nombre'));
    const [ apellido, setApellido ] = useState(localStorage.getItem('apellido'));
    const [ cedula, setCedula ] = useState(localStorage.getItem('cedula'));
    const [ correo, setCorreo ] = useState(localStorage.getItem('correo'));
    const [ usuario_id, setUsuario_id ] = useState(localStorage.getItem('usuario_id'));



    useEffect(()=>{
        setNombre(localStorage.getItem('nombre'));
        setApellido(localStorage.getItem('apellido'));
        setCedula(localStorage.getItem('cedula'));
        setCorreo(localStorage.getItem('correo'));
        setUsuario_id(localStorage.getItem('usuario_id'));
        tipoAlquileres()


    },[]);


    const [dato, setData] = useState({
        correo:correo,
        apellido:apellido,
        nombre:nombre,
        cedula: cedula,
        usuario_id: usuario_id

    });


    const {register, handleSubmit, errors} = useForm({
        reValidateMode:'onSubmit'
    });

    const onSubmit = async() =>{
        //
        // const info = await updateUsuario(dato.nombre, dato.apellido, dato.correo);
        //
        //
        // console.log(info.updateUsuario.nombre)
        // console.log(info.updateUsuario)
        //
        // localStorage.setItem('nombre', info.updateUsuario.nombre);
        // localStorage.setItem('apellido', info.updateUsuario.apellido);
        // localStorage.setItem('correo', info.updateUsuario.correo);
        // localStorage.setItem('cedula', info.updateUsuario.cedula);

    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Alquiler', headerName: 'Alquiler', width: 130 },
        { field: 'Precio', headerName: 'Precio', width: 130 },
        { field: 'Estatus', headerName: 'Estatus', width: 130 },

    ];


    const [alquiler, setAlquiler] = useState([])
    const [rows, setRows] = useState([])



    const tipoAlquileres = async() =>{

        const response = await getTipoAlquileres();

        const est = await getEstatus();

        let alqs = response.getTipoAlquileres.map(alq =>{
            const res = est.getEstatus.find(r =>r.estatus_id === alq.estatus_id).descripcion
            return {
                ...alq,
                estatus_desc: res
            }
        })
        setAlquiler(response.getTipoAlquileres)

    }

    const alquileres =(alquileres)=>(
        alquileres.map((alquiler)=>(
                setRows({ id: alquiler.tipoAlquiler_id, Alquiler: alquiler.descripcion, Estatus: alquiler.estatus_desc})

            )
        ))


    const handleChange = e =>{
        setData({
            ...dato,
            [e.target.name] : e.target.value
        })

    }



    async function getTipoAlquileres() { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9700/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Query de graphql
            query: gql`
                query{
                    getTipoAlquileres{
                        estatus_id
                        descripcion
                        tipoAlquiler_id
                        precio_usd
                    }
                }
            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    async function getEstatus() { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9700/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Query de graphql
            query: gql`
                query{
                    getEstatus(identificador: "SERVICIO"){
                        estatus_id
                        descripcion
                    }
                }
            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };



    return (
        <div className={styles.toda}>

            <div className={styles.orden}>
                <Image className={styles.fondo}
                       src="/fondoInicio.jpg"
                       alt="imagen"
                       layout="fill"
                />
                <NavbarInicio/>
            </div>

            <div className={styles.todo}>

                <div style={{ height: 400, width: '100%' }}>
                    {alquiler && alquileres(alquiler)}
                    {console.log(rows)}
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                </div>


            </div>


        </div>

    )

}
export default Solicitudes;
