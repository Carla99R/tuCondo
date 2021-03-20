import React, { useEffect, useState} from 'react';
import styles from '../styles/adminCondominios.module.css'
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {makeStyles} from "@material-ui/core/styles";
import NavbarInicio from "../components/navbarInicio";
import Image from "next/image";
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



    useEffect(()=>{
        setNombre(localStorage.getItem('nombre'));
        setApellido(localStorage.getItem('apellido'));
        setCedula(localStorage.getItem('cedula'));
        setCorreo(localStorage.getItem('correo'));
        setUsuario_id(localStorage.getItem('usuario_id'));
        factura()
        estados()


    },[]);


    const [dato, setData] = useState({
        correo:correo,
        apellido:apellido,
        nombre:nombre,
        cedula: cedula,
        usuario_id: usuario_id

    });

    const [info, setInfo] = useState([])
    const [estatus_id, setEstatus_id] = useState([])
    const [estatus, setEstatus] = useState([])



    const factura = async() =>{

        const response = await getFacturas(dato.usuario_id);
        setInfo(response.getFacturas)

    }

    const estados = async() =>{

        const response = await getEstatus();
        setEstatus(response.getEstatus)

    }

    const facturaStatus =(id) =>{
        console.log(id);
        console.log(estatus);
        const ESTATUS  = estatus.find( r => r.estatus_id === id );
        return ESTATUS;

    }


    const facturas =(info)=>(

            info.map((factura)=>(
                <tbody>
                <tr className={styles.border}>
                    <td className={styles.borde}>{factura.factura_id}</td>
                    <td className={styles.borde}> {factura.monto_total}</td>
                    <td className={styles.borde}>{ facturaStatus(factura.estatus_id).descripcion }</td>
                </tr>
                </tbody>
        )

    ))

    async function getFacturas() { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
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

    async function getEstatus() { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Query de graphql
            query: gql`
                        query{
                            getEstatus{
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

    async function getPagos(factura_id) { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
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
                                tipo_pago_id
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
            uri: `http://localhost:9900/graphql`,
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

        <div className={styles.all}>

            <div className={styles.orden}>
                <Image className={styles.fondo}
                       src="/fondoInicio.jpg"
                       alt="imagen"
                       layout="fill"
                />
                <NavbarInicio/>
            </div>

            <div className={styles.tabla}>
                <Table striped bordered hover >
                    <thead>
                    <tr className={styles.border}>
                        <th className={styles.border}>Factura ID</th>
                        <th className={styles.border}>Monto total</th>
                        <th className={styles.border}>Estatus</th>
                    </tr>
                    </thead>

                    {info && facturas(info)}

                </Table>

            </div>
        </div>


    )
}

export default Pagos;

