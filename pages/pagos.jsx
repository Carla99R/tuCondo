import React, {useEffect, useState} from "react";
import styles from "../styles/adminCondominios.module.css";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import Image from "next/image";
import NavbarInicio from "../components/navbarInicio";
import Table from "@material-ui/core/Table";
import {object} from "prop-types";



const Pagos =()=> {

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
    factura()


},[]);


const [dato, setData] = useState({
    correo:correo,
    apellido:apellido,
    nombre:nombre,
    cedula: cedula,
    usuario_id: usuario_id

});

const [info, setInfo] = useState([])
const [pagos, setPagos] = useState([])
const [estatus, setEstatus] = useState()



const factura = async() =>{

    let response = await getFacturas(dato.usuario_id);
    console.log(response)

    const estado = await getEstatus();
    console.log(estado)


    let facturas = response.getFacturas.map(fact =>{
       const res = estado.getEstatus.find(r =>r.estatus_id === fact.estatus_id).descripcion
        let f_new = {
           ...fact,
            estatus_desc: res
        }
        return f_new
    })
    setEstatus(estado.getEstatus)
    setInfo(facturas)


}

const pago = async(factura_id) =>{

    const response = await getPagos(factura_id);
    setPagos(response.getPagos)


}

const facturas =(info)=>(

    info.map((factura)=>(
            <tbody>
            <tr className={styles.border}>
                <td className={styles.borde} key={factura.factura_id}>{factura.factura_id}</td>
                <td className={styles.borde} key={factura.monto_total}> {factura.monto_total}</td>
                <td className={styles.borde} key={factura.monto_total}> {factura.estatus_desc}</td>

            </tr>
            </tbody>

        )

    ))



async function getFacturas() { //Función asincrona para consumir datos de la API

    const client = new ApolloClient({ // Cliente de Apolo
        uri: `http://localhost:9700/graphql`,
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
        uri: `http://localhost:9700/graphql`,
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
        uri: `http://localhost:9700/graphql`,
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

async function getTipoPago(tipoPago_id) { //Función asincrona para consumir datos de la API

    const client = new ApolloClient({ // Cliente de Apolo
        uri: `http://localhost:9700/graphql`,
        cache: new InMemoryCache()
    });

    // try{
    const {data} = await client.query({ // Query de graphql
        query: gql`
            query{
                getTipoPago(tipoPago_id: ${tipoPago_id}){
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