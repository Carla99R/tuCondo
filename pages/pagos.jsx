import React, { useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";
import styles from '../styles/adminCondominios.module.css'
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {useForm} from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";
import NavbarInicio from "../components/navbarInicio";
import Image from "next/image";
import {Spinner} from "react-bootstrap";
import Table from "@material-ui/core/Table";

const Pagos =()=> {

    const useStyles = makeStyles((theme) => ({
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            width: 500
        },
    }));

    const [ nombre, setNombre ] = useState(localStorage.getItem('nombre'));
    const [ apellido, setApellido ] = useState(localStorage.getItem('apellido'));
    const [ cedula, setCedula ] = useState(localStorage.getItem('cedula'));
    const [ correo, setCorreo ] = useState(localStorage.getItem('correo'));
    const [ usuario_id, setUsuario_id ] = useState(localStorage.getItem('usuario_id'));

    const [ loading, setLoading ] = useState(true);


    useEffect(()=>{
        setNombre(localStorage.getItem('nombre'));
        setApellido(localStorage.getItem('apellido'));
        setCedula(localStorage.getItem('cedula'));
        setCorreo(localStorage.getItem('correo'));
        setUsuario_id(localStorage.getItem('usuario_id'));
        setLoading(true);


    },[]);


    const [dato, setData] = useState({
        correo:correo,
        apellido:apellido,
        nombre:nombre,
        cedula: cedula,
        usuario_id: usuario_id

    });

    const classes = useStyles();


    const inicial = async() =>{

        const info = await getInitialProps(dato.usuario_id);

        console.log(info.getApartamento.nombre)
        console.log(info.getApartamento)



    }

    async function getFacturas(nombre, apellido, correo) { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9600/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Mutation de graphql
            query: gql`
                        query{
                            getFacturas(usuario_id: ${localStorage.getItem("usuario_id")}){
                                estatus_id
                                monto_total
                                factura_id
                                }
                          }
                        `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    async function getEstatus(estatus_id) { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9600/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Query de graphql
            query: gql`
                        query{
                            getEstatus(usuario_id: ${estatus_id}){
                                descripcion
                                }
                          }
                        `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    async function getPagos(factura_id) { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9600/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Query de graphql
            query: gql`
                        query{
                            getPagos(factura_id: ${factura_id}){
                                currency
                                conversion
                                monto_usd
                                monto_bss
                                tipoPago_id
                                }
                          }
                        `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    async function getTipoPago(factura_id) { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9600/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Query de graphql
            query: gql`
                        query{
                            getPagos(factura_id: ${factura_id}){
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

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Factura ID</th>
                        <th>Monto total</th>
                        <th>Estatus</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </Table>

            </div>
        </div>


    )
}

export default Pagos;

