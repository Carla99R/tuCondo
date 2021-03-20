import React, { useEffect, useState} from 'react';
import styles from '../styles/adminCondominios.module.css'
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {useForm} from "react-hook-form";
import NavbarInicio from "../components/navbarInicio";
import Image from "next/image";
import Table from "@material-ui/core/Table";

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
        tipoAlquilado()


    },[]);


    const [dato, setData] = useState({
        correo:correo,
        apellido:apellido,
        nombre:nombre,
        cedula: cedula,
        usuario_id: usuario_id

    });


    const {handleSubmit} = useForm({
        reValidateMode:'onSubmit'
    });

    const submit = async(interdata, precio) =>{
        //TODO ACA ME LANZO EL QUERY DE UPDATE TIPOALQUILER Y EL CREATE ALQUILER

        console.log(interdata)
        console.log(precio)

        const est = await getEstatus();
        const res = est.getEstatus.find(r =>r.descripcion === "ALQUILADO").estatus_id

        const p = await updateTipoAlquileres(interdata, res);
        const c = await createAlquiler(interdata, dato.usuario_id);

        const facturas = await getFacturas(dato.usuario_id);

        const monto_bss = precio * 1900000

        // let facts = facturas.getFacturas.map(alq =>{
        //     const res = est.getEstatus.find(r =>r.estatus_id === alq.estatus_id).descripcion
        //     return {
        //         ...alq,
        //         estatus_desc: res
        //     }
        // })

        const factura = facturas.getFacturas.find(r =>r.estatus_id === 2).factura_id
        console.log(factura)

        if(factura=== undefined){
            const monto_bs = p.updateTipoAlquiler.precio_usd * 1900000

            const fact = await createFactura(dato.usuario_id, p.updateTipoAlquiler.precio_usd);
            const pago = await createPago(fact.createFactura.factura_id, p.updateTipoAlquiler.precio_usd, monto_bs);

        }else{
            // const precio = facturas.getPagos.find(r =>r.factura_id === factura).monto_bss
            // console.log(precio)
            const pago = await createPago(factura, precio, monto_bss);
            console.log(pago)
        }


        //setAlquilar(p.updateTipoAlquiler)
        //setCrear(c.createAlquiler)

    }


    const [alquiler, setAlquiler] = useState([])
    const [pagoNew, setPagoNew] = useState([])
    const [alquilo, setAlquilado] = useState([])
    const [factura, setFactura] = useState([])



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
        setAlquiler(alqs)

    }

    const tipoAlquilado = async() =>{

        const response = await getAlquiler(dato.usuario_id);

        const est = await getTipoAlquileres();

        let alqs = response.getAlquileres.map(alq =>{
            const res = est.getTipoAlquileres.find(r =>r.tipoAlquiler_id === alq.tipoAlquiler_id).descripcion
            const ros = est.getTipoAlquileres.find(r =>r.tipoAlquiler_id === alq.tipoAlquiler_id).precio_usd
            return {
                ...alq,
                alquiler_desc: res,
                alquiler_precio: ros
            }
        })
        setAlquilado(alqs)

    }

    const alquileres =(alquileres)=>(

        alquileres.map((alquiler)=>(
                <>
                    <tbody>
                    <tr  key={alquiler.factura_id} >
                        <td className={styles.borde} key={alquiler.tipoAlquiler_id}>{alquiler.tipoAlquiler_id}</td>
                        <td className={styles.borde} key={alquiler.descripcion}> {alquiler.descripcion}</td>
                        <td className={styles.borde} key={alquiler.precio_usd}> {alquiler.precio_usd}</td>
                        <td className={styles.borde} key={alquiler.estatus_id}> {alquiler.estatus_desc}</td>


                        <div style={alquiler.estatus_desc === "ALQUILADO" ? {"visible": "hidden"}: {"visible": ""}}>
                            <button
                                className={styles.bot}
                                onClick={(e) => submit(alquiler.tipoAlquiler_id, alquiler.precio_usd, e)}
                                type="submit"
                            >
                                Añadir
                            </button>
                        </div>

                    </tr>
                    </tbody>

                </>

            )

        ))

    const alquilado =(alquilo)=>(

        alquilo.map((alq)=>(
                <>
                    <tbody>
                    <tr  key={alq.alquiler_id} >
                        <td className={styles.borde} key={alq.alquiler_id}>{alq.alquiler_id}</td>
                        <td className={styles.borde} key={alq.estatus_id}> {alq.alquiler_desc}</td>
                        <td className={styles.borde} key={alq.estatus_id}> {alq.alquiler_precio}</td>

                        <button
                            className={styles.bot}
                            onClick={(e) => eliminar(alq.alquiler_id, alq.alquiler_desc, e)}
                            type="submit"
                        >
                            Eliminar
                        </button>

                    </tr>
                    </tbody>

                </>

            )

        ))

    const eliminar = async(id, desc) =>{

        console.log(id)
        const est = await getTipoAlquileres();

        const res = est.getTipoAlquileres.find(r =>r.descripcion === desc).tipoAlquiler_id

        const pt = await updateTipoAlquileres(res, 4);
        console.log(pt)

        const p = await deleteAlquiler(id);

        // const est = await getEstatus();
        // const res = est.getEstatus.find(r =>r.descripcion === "DISPONIBLE").estatus_id


    }


    async function getTipoAlquileres() { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
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
            uri: `http://localhost:9900/graphql`,
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

    async function updateTipoAlquileres(tipoAlquiler_id, estatus) { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.mutate({ // Query de graphql
            mutation: gql`
                mutation {
                    updateTipoAlquiler(tipoAlquiler_id: ${tipoAlquiler_id}, estatus_id: ${estatus}){
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

    async function createAlquiler(tipoAlquiler_id, usuario) { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.mutate({ // Query de graphql
            mutation: gql`
                mutation {
                    createAlquiler(tipoAlquiler_id: ${tipoAlquiler_id}, usuario_id: ${usuario}){
                        tipoAlquiler_id
                        alquiler_id
                    }
                }
            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    async function getAlquiler(usuario_id) { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Query de graphql
            query : gql`
                query {
                    getAlquileres(usuario_id: ${usuario_id}){
                        tipoAlquiler_id
                        alquiler_id
                    }
                }
            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    async function deleteAlquiler(alquiler_id) { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.mutate({ // Query de graphql
            mutation: gql`
                mutation {
                    deleteAlquiler(alquiler_id: ${alquiler_id}){
                        alquiler_id
                    }
                }
            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

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

    async function createPago(factura_id, monto_usd, monto_bss) { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.mutate({ // Query de graphql
            mutation: gql`
                mutation {
                    createPago( tipoPago_id: 3, factura_id: ${factura_id}, currency: "USD", conversion: "1900000.00", monto_usd: "${monto_usd}", monto_bss: "${monto_bss}"){
                        pago_id
                        tipoPago_id
                    }
                }
            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    async function createFactura(usuario_id, monto) { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.mutate({ // Query de graphql
            mutation: gql`
                mutation {
                    createFactura(usuario_id: ${usuario_id}, monto_total: "${monto}"){
                        factura_id
                    }
                }
            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    async function deletePago(pago_id) { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.mutate({ // Query de graphql
            mutation: gql`
                mutation {
                    deletePago(pago_id: ${pago_id}){
                        pago_id
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

            <div className={styles.tab}
            >
                <div >
                    <Table striped bordered hover className={styles.t}>
                        <thead>
                        <tr className={styles.border}>
                            <th className={styles.border}>ID</th>
                            <th className={styles.border}>Servicio</th>
                            <th className={styles.border}>Precio ($)</th>
                            <th className={styles.border}>Estatus</th>
                        </tr>
                        </thead>
                        {alquiler && alquileres(alquiler)}
                    </Table>
                </div>

                <div>
                    <Table striped bordered hover className={styles.t}>
                        <thead>
                        <tr className={styles.border}>
                            <th className={styles.border}>ID</th>
                            <th className={styles.border}>Servicio</th>
                            <th className={styles.border}>Precio ($)</th>
                        </tr>
                        </thead>
                        {alquilo && alquilado(alquilo)}
                    </Table>
                </div>
            </div>
        </div>

    )

}
export default Solicitudes;
