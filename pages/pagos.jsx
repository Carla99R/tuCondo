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
            width: 900
        },
    }));



const [dato, setData] = useState({
    correo:correo,
    apellido:apellido,
    nombre:nombre,
    cedula: cedula,
    usuario_id: usuario_id,
    factura_id:""

});

    const {handleSubmit} = useForm({
        reValidateMode:'onSubmit'
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
        return {
            ...fact,
            estatus_desc: res
        }
    })
    setEstatus(estado.getEstatus)
    setInfo(facturas)


}


const facturas =(info)=>(

    info.map((factura)=>(
        <>
            <tbody>
            <tr  key={factura.factura_id} >
                <td className={styles.borde} key={factura.factura_id}>{factura.factura_id}</td>
                <td className={styles.borde} key={factura.monto_total}> {factura.monto_total}</td>
                <td className={styles.borde} key={factura.monto_total}> {factura.estatus_desc}</td>
                <button
                    className={styles.bot}
                    onClick={(e) => submit(factura.factura_id, e)}
                    type="submit"
                >
                    Ver Detalles
                </button>

            </tr>
            </tbody>

        </>

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
                            pago_id
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

async function getTipoPago() { //Función asincrona para consumir datos de la API

    const client = new ApolloClient({ // Cliente de Apolo
        uri: `http://localhost:9700/graphql`,
        cache: new InMemoryCache()
    });

    // try{
    const {data} = await client.query({ // Query de graphql
        query: gql`
            query{
                getTipoPago{
                    tipoPago_id
                    descripcion
                }
            }
        `,
    });
    console.log('////////////////////////')
    console.log('data:', data)

    return data;

};

    const submit = async(interdata) =>{

        console.log(interdata)

        const p = await getPagos(interdata);

        const estado = await getTipoPago();

        let pags = p.getPagos.map(pag =>{
            const res = estado.getTipoPago.find(r =>r.tipoPago_id === pag.tipoPago_id).descripcion
            return {
                ...pag,
                tipoPago_desc: res
            }
        })

        setPagos(pags)
        setId(interdata)
        setOpen(true);


    }

    const pagar =(pagos)=>(

        pagos.map((pago)=>(
                <>
                    <tbody>
                    <tr className={styles.border}>
                        <td className={styles.borde} key={pago.pago_id}>{pago.pago_id}</td>
                        <td className={styles.borde} key={pago.tipoPago_id}> {pago.tipoPago_desc}</td>
                        <td className={styles.borde} key={pago.currency}> {pago.currency}</td>
                        <td className={styles.borde} key={pago.monto_usd}> {pago.monto_usd}</td>
                        <td className={styles.borde} key={pago.monto_bss}> {pago.monto_bss}</td>

                    </tr>
                    </tbody>

                </>

            )

        ))

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [id, setId] = useState([]);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                    <th className={styles.border}>Factura ID</th>
                    <th className={styles.border}>Monto total</th>
                    <th className={styles.border}>Estatus</th>
                </tr>
                </thead>
                {info && facturas(info)}
                </Table>
            <div className={styles.inicio}>

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
                            <h2 id="transition-modal-title">Pagos factura {id}</h2>

                            <Table striped bordered hover >
                                <thead>
                                <tr className={styles.border}>
                                    <th className={styles.border}>Pago ID</th>
                                    <th className={styles.border}>Descripcion</th>
                                    <th className={styles.border}>Moneda</th>
                                    <th className={styles.border}>Monto ($)</th>
                                    <th className={styles.border}>Monto (BsS)</th>
                                </tr>
                                </thead>
                                {pagos && pagar(pagos)}
                            </Table>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    </div>


)
}

export default Pagos;