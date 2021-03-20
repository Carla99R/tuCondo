import React, {useEffect, useState} from "react";
import styles from "../styles/adminCondominios.module.css";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import Image from "next/image";
import NavbarInicio from "../components/navbarInicio";
import Table from "@material-ui/core/Table";
import {makeStyles} from "@material-ui/core";
import {useForm} from "react-hook-form";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";


const P =()=> {

    const [ nombre, setNombre ] = useState(localStorage.getItem('nombre'));
    const [ apellido, setApellido ] = useState(localStorage.getItem('apellido'));
    const [ cedula, setCedula ] = useState(localStorage.getItem('cedula'));
    const [ correo, setCorreo ] = useState(localStorage.getItem('correo'));
    const [ usuario_id, setUsuario_id ] = useState(localStorage.getItem('usuario_id'));



    useEffect(()=>{
        setNombre(localStorage.getItem('nombre'))
        setApellido(localStorage.getItem('apellido'))
        setCedula(localStorage.getItem('cedula'))
        setCorreo(localStorage.getItem('correo'))
        setUsuario_id(localStorage.getItem('usuario_id'))
        pags()


    },[]);




    const [dato, setData] = useState({
        correo:correo,
        apellido:apellido,
        nombre:nombre,
        cedula: cedula,
        usuario_id: usuario_id,
        factura_id:""

    });


    const [pagos, setPagos] = useState([])

    const pags = async() =>{

        const estado = await getTipoPagos();
        const p = await getPagos();

        let pgs = p.getPagos.map(pag =>{
            const res = estado.getTipoPagos.find(r =>r.tipo_pago_id === pag.tipo_pago_id).descripcion
            return {
                ...pag,
                metodo_pago: res
            }
        })


        setPagos(pgs);

    }

    const ps =(pagos)=>(

        pagos.map((pago)=>(
                <>
                    <tbody>
                    <tr  key={pago.pago_id} >
                        <td className={styles.borde} key={pago.pago_id}>{pago.pago_id}</td>
                        <td className={styles.borde} key={pago.monto}> {pago.monto}</td>
                        <td className={styles.borde} key={pago.comprobante}> {pago.comprobante}</td>
                        <td className={styles.borde} key={pago.metodo_pago}> {pago.metodo_pago}</td>
                        <td className={styles.borde} key={pago.factura_id}> {pago.factura_id}</td>


                    </tr>
                    </tbody>

                </>

            )

        ))



    async function getPagos() { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Query de graphql
            query: gql`
                query{
                    getPagos{
                        pago_id
                        monto
                        comprobante
                        tipo_pago_id
                        factura_id
                    }
                }
            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    async function getTipoPagos() { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Query de graphql
            query: gql`
                query{
                    getTipoPagos{
                        tipo_pago_id
                        descripcion
                        currency
                    }
                }
            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };


    return (

        <div className={styles.all} >

            <div className={styles.orden}>
                <Image className={styles.fondo}
                       src="/fondoInicio.jpg"
                       alt="imagen"
                       layout="fill"
                />
                <NavbarInicio/>
            </div>

            <div className={styles.tabla}
            >
                <Table striped bordered hover >
                    <thead>
                    <tr className={styles.border}>
                        <th className={styles.border}>Pago ID</th>
                        <th className={styles.border}>Monto</th>
                        <th className={styles.border}>Comprobante</th>
                        <th className={styles.border}>Metodo de Pago</th>
                        <th className={styles.border}>Factura ID</th>
                    </tr>
                    </thead>
                    {pagos && ps(pagos)}
                </Table>

                </div>
            </div>

    )
}

export default P;