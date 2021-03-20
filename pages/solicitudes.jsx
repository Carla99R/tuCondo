import React, { useEffect, useState} from 'react';
import styles from '../styles/adminCondominios.module.css'
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {useForm} from "react-hook-form";
import NavbarInicio from "../components/navbarInicio";
import Image from "next/image";
import Table from "@material-ui/core/Table";
import {makeStyles, TextField} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";


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
        usuario_id: usuario_id,
        apartamento:"",
        apartamento_id: "",
        tipoAlquiler_id:"",
        descripcion:"",
        gasto_id:"",


    });


    const {handleSubmit, errors, register} = useForm({
        reValidateMode:'onSubmit'
    });

    const submit = async(interdata, descripcion) =>{

        setOpen(true)

        setData({
            ...dato,
            tipoAlquiler_id : interdata,
            descripcion : descripcion

        })

    }

    const onSubmit = async() =>{

        console.log(dato.tipoAlquiler_id)
        console.log(dato.descripcion)
        console.log(dato.apartamento)


        const apt = await getApartamento();
        const est = await getEstatus();
        const res = est.getEstatus.find(r =>r.descripcion === "ALQUILADO").estatus_id

        console.log(apt.getApartamento)

        const p = await updateTipoAlquileres(dato.tipoAlquiler_id, res);
        const c = await createAlquiler(dato.tipoAlquiler_id, dato.usuario_id);

        const monto_bs = p.updateTipoAlquiler.precio_usd * 1900000

        const fact = await createFactura(apt.getApartamento.apartamento_id, monto_bs);
        console.log(fact.createFactura)

        const gasto = await createGasto( fact.createFactura.factura_id);

        console.log(gasto.createGasto)
        console.log(gasto.createGasto.gasto_id)
        console.log(apt.getApartamento.apartamento_id)


        const pago = await createGastoApartamento(gasto.createGasto.gasto_id, apt.getApartamento.apartamento_id, monto_bs);

        setData({
            ...dato,
            gasto_id : pago.createGastoApartamento.gasto_id,
            apartamento_id: apt.getApartamento.apartamento_id
        })

        console.log(pago.createGastoApartamento)
        setOpen(false)

    }


    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            width: 900,
            maxHeight: '80vh',
            overflowY: 'auto',
        },
    }));

    const [alquiler, setAlquiler] = useState([])
    const [alquilo, setAlquilado] = useState([])
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);



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
                                onClick={(e) => submit(alquiler.tipoAlquiler_id, alquiler.descripcion, e)}
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

    const handleChange = e =>{
        setData({
            ...dato,
            [e.target.name] : e.target.value
        })

    }

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

    async function getApartamento() { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Query de graphql
            query: gql`
                query{
                    getApartamento(nombre: "${dato.apartamento}", usuario_id: ${localStorage.getItem('usuario_id')}){
                        apartamento_id
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

    async function deleteFactura(factura_id) { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.mutate({ // Query de graphql
            mutation: gql`
                mutation {
                    deleteFactura(factura_id: ${factura_id}){
                        factura_id
                    }
                }
            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };



    async function createGasto(factura_id) { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.mutate({ // Query de graphql
            mutation: gql`
                mutation {
                    createGasto(descripcion: "${dato.descripcion}", factura_id: ${factura_id}){
                        gasto_id
                        descripcion
                    }
                }
            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    async function createGastoApartamento(gasto_id, apartamento_id, monto_apartamento) { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        const { data } = await client.mutate({ // Query de graphql
            mutation: gql`
                mutation{
                    createGastoApartamento(gasto_id: ${gasto_id}, apartamento_id: ${apartamento_id}, monto_apartamento: ${monto_apartamento}){
                        gasto_id
                        apartamento_id
                        monto_apartamento
                    }
                }
            `,
        });

        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };
    async function createFactura(apartamento_id, monto) { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.mutate({ // Query de graphql
            mutation: gql`
                mutation {
                    createFactura(apartamento_id: ${apartamento_id}, monto_total: ${monto}){
                        factura_id
                    }
                }
            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    const handleClose = () => {
        setOpen(false);
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
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">Ingrese apartamento</h2>

                            <div>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className={`${classes.root} ${styles.form}`}
                                >
                                    <TextField
                                        label="Apartamento:"
                                        className={"col s12"}
                                        name="apartamento"
                                        inputRef={register({
                                            required: {value: true, message: "Apartamento obligatorio"}
                                        })}
                                        onChange={handleChange}
                                    />
                                    <div style={{display:"block", color:"red", visibility:errors?.apartamento ? "visible" : "hidden"}}>{`${errors?.apartamento && errors?.apartamento?.message} `}</div>

                                    <div className={styles.inicio}>
                                        <button
                                            className={styles.boton}
                                        >
                                            Aceptar
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>

    )

}
export default Solicitudes;
