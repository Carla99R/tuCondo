import React, {useEffect, useState} from "react";
import styles from "../styles/adminCondominios.module.css";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import Image from "next/image";
import NavbarInicio from "../components/navbarInicio";
import Table from "@material-ui/core/Table";
import {makeStyles, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";


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
    apartamento()


},[]);

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



const [dato, setData] = useState({
    correo:correo,
    apellido:apellido,
    nombre:nombre,
    cedula: cedula,
    usuario_id: usuario_id,
    factura_id:"",
    monto_total: "",
    referencia:"",
    tipo_pago_id:""

});

    const {handleSubmit, errors, register} = useForm({
        reValidateMode:'onSubmit'
    });

const [info, setInfo] = useState([])
const [pagos, setPagos] = useState([])
const [gastos, setGastos] = useState([])
const [estatus, setEstatus] = useState()
const [apt, setApt] = useState()
const [tipoPago, settipoPago] = useState()
const [fID, setfID] = useState()





    const apartamento = async() =>{

        const apartamentos = await getApartamentos();
        setApt(apartamentos.getApartamentos);

    }

    const apartamentos =(info)=>(

        info.map((apartamento)=>(
                <>
                    <tbody>
                    <tr  key={apartamento.factura_id} >
                        <td className={styles.borde} key={apartamento.apartamento_id}>{apartamento.apartamento_id}</td>
                        <td className={styles.borde} key={apartamento.nombre}> {apartamento.nombre}</td>
                        <td className={styles.borde} key={apartamento.alicuota}> {apartamento.alicuota}</td>
                        <td className={styles.borde} key={apartamento.dimensiones}> {apartamento.dimensiones}</td>

                        <button
                            className={styles.bot}
                            onClick={(e) => submitApartamento(apartamento.apartamento_id, e)}
                            type="submit"
                        >
                            Ver Facturas
                        </button>

                    </tr>
                    </tbody>

                </>

            )

        ))

const facturas =(info)=>(

    info.map((factura)=>(
        <>
            <tbody>
            <tr  key={factura.factura_id} >
                <td className={styles.borde} key={factura.factura_id}>{factura.factura_id}</td>
                <td className={styles.borde} key={factura.apartamento_id}>{factura.apartamento_id}</td>
                <td className={styles.borde} key={factura.monto_total}> {factura.monto_total}</td>
                <td className={styles.borde} key={factura.estatus_desc}> {factura.estatus_desc}</td>
                <button
                    className={styles.bot}
                    onClick={(e) => submit(factura.factura_id, factura.apartamento_id, e)}
                    type="submit"
                >
                    Ver Detalles
                </button>
                <button
                    className={styles.bot}
                    onClick={(e) => pagarGastos(factura.factura_id, factura.monto_total, e)}
                    type="submit"
                >
                    Proceder con el Pago
                </button>

            </tr>
            </tbody>

        </>

        )

    ))

    const t =(tipos)=>(

        tipos.map((tipo)=>(
                <>
                    <tbody>
                    <tr className={styles.border}>
                        <td className={styles.borde} key={tipo.tipo_pago_id}>{tipo.tipo_pago_id}</td>
                        <td className={styles.borde} key={tipo.descripcion}> {tipo.descripcion}</td>
                        <td className={styles.borde} key={tipo.currency}> {tipo.currency}</td>
                        <button
                            className={styles.bot}
                            onClick={(e) => pago(tipo.tipo_pago_id, e)}
                            type="submit"
                        >
                            Pagar
                        </button>

                    </tr>
                    </tbody>

                </>

            )

        ))


    async function getApartamentos() { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        const {data} = await client.query({ // Query de graphql
            query: gql`
                query{
                    getApartamentos(usuario_id: ${localStorage.getItem("usuario_id")}){
                        is_alquilado
                        alicuota
                        nombre
                        dimensiones
                        apartamento_id
                    }
                }
            `,
        });

        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };



async function getFacturas(apartamento_id) { //Función asincrona para consumir datos de la API

    const client = new ApolloClient({ // Cliente de Apolo
        uri: `http://localhost:9900/graphql`,
        cache: new InMemoryCache()
    });

    // try{
    const {data} = await client.query({ // Mutation de graphql
        query: gql`
            query{
                getFacturas(apartamento_id: ${apartamento_id}){
                    factura_id
                    estatus_id
                    monto_total
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
                getEstatus(identificador: "FACTURA"){
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

async function createPago() { //Función asincrona para consumir datos de la API

    const client = new ApolloClient({ // Cliente de Apolo
        uri: `http://localhost:9900/graphql`,
        cache: new InMemoryCache()
    });

    // try{
    const {data} = await client.mutate({ // Query de graphql
        mutation: gql`
                    mutation{
                        createPago(tipo_pago_id: ${dato.tipo_pago_id}, factura_id: ${fID} , monto: ${dato.monto_total}, comprobante: ${dato.referencia}){
                            pago_id
                            monto
                            comprobante
                            tipo_pago_id
                            }
                      }
                    `,
    });
    console.log('////////////////////////')
    console.log('data:', data)

    return data;

};


    async function getGastoApartamento(apartamento_id) { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const { data } = await client.query({ // Query de graphql
            query: gql`
                query{
                    getGastoApartamento(apartamento_id: ${apartamento_id}){
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

    async function getGasto(factura_id) { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const { data } = await client.query({ // Query de graphql
            query: gql`
                query{
                    getGasto(factura_id: ${factura_id}){
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

    async function updateFactura(factura_id, estatus) { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.mutate({ // Query de graphql
            mutation: gql`
                mutation {
                    updateFactura(factura_id: ${factura_id}, estatus_id: ${estatus}){
                        factura_id
                    }
                }
            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    const submit = async(factura_id, apartamento_id) =>{


        const estado = await getGasto(factura_id);

        const gasto = await getGastoApartamento(apartamento_id);

        let pags = gasto.getGastoApartamento.map(pag =>{
            const res = estado.getGasto.find(r =>r.gasto_id === pag.gasto_id).descripcion
            return {
                ...pag,
                gasto_desc: res
            }
        })

        setGastos(pags)
        setOpen(true);

    }

    const submitApartamento = async(interdata) =>{

        let response = await getFacturas(interdata);
        console.log(response)

        const estado = await getEstatus();
        console.log(estado)


        let facturas = response.getFacturas.map(fact =>{
            const res = estado.getEstatus.find(r =>r.estatus_id === fact.estatus_id).descripcion
            return {
                ...fact,
                estatus_desc: res
            }
        })
        setEstatus(estado.getEstatus)
        setInfo(facturas)
        setOpenA(true);

    }


    const pagarGastos = async(factura_id, monto_total) =>{

        setData({
            ...dato,
            monto_total : monto_total

        })

        const p = await getTipoPagos();
        settipoPago(p.getTipoPagos)
        console.log(tipoPago)
        setOpenTipoP(true);
        setfID(factura_id)
    }


    const pago = async(interdata) =>{

        setData({
            ...dato,
            tipo_pago_id : interdata

        })
        setOpenP(true)
    }


    const pa = async() =>{


        const est = await getEstatus();
        const res = est.getEstatus.find(r =>r.descripcion === "PAGADO").estatus_id

        const p = await updateFactura(fID, res);

        const pag = await createPago();

        setOpenP(false)
        setOpenTipoP(false)
    }

    const g =(gastos)=>(

        gastos.map((gasto)=>(
                <>
                    <tbody>
                    <tr className={styles.border}>
                        <td className={styles.borde} key={gasto.pago_id}>{gasto.gasto_id}</td>
                        <td className={styles.borde} key={gasto.gasto_desc}> {gasto.gasto_desc}</td>
                        <td className={styles.borde} key={gasto.apartamento_id}> {gasto.apartamento_id}</td>
                        <td className={styles.borde} key={gasto.monto_apartamento}> {gasto.monto_apartamento}</td>

                    </tr>
                    </tbody>

                </>

            )

        ))


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openA, setOpenA] = React.useState(false);
    const [openTipoP, setOpenTipoP] = React.useState(false);
    const [openP, setOpenP] = React.useState(false);


    const handleOpen = () => {
        setOpen(true);
        setOpenA(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenA(false);
        setOpenTipoP(false);
        setOpenP(false)
    };

    const handleChange = e =>{
        setData({
            ...dato,
            [e.target.name] : e.target.value
        })

    }

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
                    <th className={styles.border}>Apartamento ID</th>
                    <th className={styles.border}>Nombre</th>
                    <th className={styles.border}>Alicuota</th>
                    <th className={styles.border}>Dimensiones</th>
                </tr>
                </thead>
                {apt && apartamentos(apt)}
            </Table>
        </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openA}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                >
                <Fade in={openA} >
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Facturas</h2>

                        <Table striped bordered hover>
                            <thead >
                            <tr className={styles.border}>
                                <th className={styles.border}>Factura ID</th>
                                <th className={styles.border}>Apartamento ID</th>
                                <th className={styles.border}>Monto total</th>
                                <th className={styles.border}>Estatus</th>
                            </tr>
                            </thead>
                            {info && facturas(info)}
                        </Table>
                    </div>
                </Fade>
            </Modal>

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
                            <h2 id="transition-modal-title">Gastos factura {fID}</h2>

                            <Table striped bordered hover >
                                <thead>
                                <tr className={styles.border}>
                                    <th className={styles.border}>Gasto ID</th>
                                    <th className={styles.border}>Descripcion</th>
                                    <th className={styles.border}>Apartamento ID</th>
                                    <th className={styles.border}>Monto</th>
                                </tr>
                                </thead>
                                {gastos && g(gastos)}
                            </Table>
                        </div>
                    </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openTipoP}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openTipoP}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">Tipos de pagos</h2>

                            <Table striped bordered hover >
                                <thead>
                                <tr className={styles.border}>
                                    <th className={styles.border}>Tipo de Pago ID</th>
                                    <th className={styles.border}>Descripcion</th>
                                    <th className={styles.border}>Moneda</th>
                                </tr>
                                </thead>
                                {tipoPago && t(tipoPago)}
                            </Table>
                        </div>
                    </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openP}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openP}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">Referencia</h2>

                            <div>
                                <form
                                    onSubmit={handleSubmit(pa)}
                                    className={`${classes.root} ${styles.form}`}
                                >
                                    <TextField
                                        label="Referencia:"
                                        className={"col s12"}
                                        name="referencia"
                                        inputRef={register({
                                            required: {value: true, message: "Referencia obligatoria"}
                                        })}
                                        onChange={handleChange}
                                    />
                                    <div style={{display:"block", color:"red", visibility:errors?.referencia ? "visible" : "hidden"}}>{`${errors?.referencia && errors?.referencia?.message} `}</div>

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


)
}

export default Pagos;