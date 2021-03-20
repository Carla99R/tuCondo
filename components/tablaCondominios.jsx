import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Spinner} from "react-bootstrap";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import styles from "../styles/landingPage.module.css";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import NavbarAdmin from "../components/navbarAdmin";
import Image from "next/image";
import {useForm} from "react-hook-form";
import {TextField} from "@material-ui/core";


     function CollapsibleTable() {
        
        const [ nombre, setNombre ] = useState(localStorage.getItem('nombre'));
        const [ apellido, setApellido ] = useState(localStorage.getItem('apellido'));
        const [ cedula, setCedula ] = useState(localStorage.getItem('cedula'));
        const [ correo, setCorreo ] = useState(localStorage.getItem('correo'));
        const [ usuario_id, setUsuario_id ] = useState(localStorage.getItem('usuario_id'));
        const [ info, setInfo ] = useState([]);
        const [ edificio, setEdificio ] = useState([]);
        const [ apartamento, setApartamento ] = useState([]);
        const [ idCondominio, setIdCondominio ] = useState([]);
        const [ idEdificio, setIdEdificio ] = useState([]); 

        useEffect(()=>{
            setNombre(localStorage.getItem('nombre'))
            setApellido(localStorage.getItem('apellido'))
            setCedula(localStorage.getItem('cedula'))
            setCorreo(localStorage.getItem('correo'))
            setUsuario_id(localStorage.getItem('usuario_id'))
            condominio();
  
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
            correo: correo,
            apellido: apellido,
            nombre: nombre,
            cedula: cedula,
            usuario_id: usuario_id,
            nombreCondominio: "",
            edificio_id: "",
            nombreEdificio: "",
            apartamento_id: "",
            nombreApartamento: "",
            aliquot: "",
            dimensions: "",
        
        });

        const condominio = async() =>{
            const response = await getCondominios(dato.usuario_id);
            console.log(response);
            setInfo(response.getCondominios);
    
        };










        const condominios =(info)=>(

            info.map((condominio)=>(
                <>
                    <tbody>
                    <tr  key={condominio.condominio_id} >
                        <td className={styles.borde} key={condominio.condominio_id}>{condominio.condominio_id}</td>
                        <td className={styles.borde} key={condominio.nombre}> {condominio.nombre}</td>
                        <button
                            className={styles.bot}
                            onClick={(e) => submitCondominio(condominio.condominio_id, e)}
                            type="submit"
                        >
                            Ver Detalles
                        </button>
                        <button
                            className={styles.bot}
                            onClick={(e) => modificarCondominio(condominio.condominio_id, condominio.nombre, e)}
                            type="submit"
                        >
                            Modificar
                        </button>
                        <button
                            className={styles.bot}
                            onClick={(e) => eliminarCondominio(condominio.condominio_id, e)}
                            type="submit"
                        >
                            Eliminar
                        </button>
        
                    </tr>
                    </tbody>
        
                </>
        
                )
        
            ))

            const edificios =(edificio)=>(

                edificio.map((edificio)=>(
                    <>
                        <tbody>
                        <tr  key={edificio.edificio_id} >
                            <td className={styles.borde} key={edificio.edificio_id}>{edificio.edificio_id}</td>
                            <td className={styles.borde} key={edificio.nombre}> {edificio.nombre}</td>
                            <td className={styles.borde} key={edificio.num_pisos}> {edificio.num_pisos}</td>
                            <button
                                className={styles.bot}
                                onClick={(e) => submitEdificio(edificio.edificio_id, e)}
                                type="submit"
                            >
                                Ver Detalles
                            </button>
                            <button
                                className={styles.bot}
                                onClick={(e) => modificarEdificio(edificio.edificio_id, edificio.nombre, edificio.num_pisos, e)}
                                type="submit"
                            >
                                Modificar
                            </button>
                            <button
                                className={styles.bot}
                                onClick={(e) => eliminarEdificio(edificio.edificio_id, e)}
                                type="submit"
                            >
                                Eliminar
                            </button>
                        </tr>
                        </tbody>
            
                    </>
            
                    )
            
                ))
            
            const apartamentos =(apartamento)=>(

                    apartamento.map((apartamento)=>(
                        <>
                            <tbody>
                            <tr  key={apartamento.apartamento_id} >
                                <td className={styles.borde} key={apartamento.apartamento_id}>{apartamento.apartamento_id}</td>
                                <td className={styles.borde} key={apartamento.nombre}> {apartamento.nombre}</td>
                                <td className={styles.borde} key={apartamento.alicuota}> {apartamento.alicuota}</td>
                                <td className={styles.borde} key={apartamento.dimensiones}> {apartamento.dimensiones}</td>
                                <td className={styles.borde} key={apartamento.is_alquilado}> {apartamento.is_alquilado}</td>
                                <button
                                    className={styles.bot}
                                    onClick={(e) => modificarApartamento(apartamento.apartamento_id, apartamento.nombre, apartamento.alicuota, apartamento.dimensiones, apartamento.is_alquilado, e)}
                                    type="submit"
                                >
                                    Modificar
                                </button>
                                <button
                                    className={styles.bot}
                                    onClick={(e) => eliminarApartamento(apartamento.apartamento_id, e)}
                                    type="submit"
                                >
                                    Eliminar
                                </button>
                            </tr>
                            </tbody>
                
                        </>
                
                        )
                
                    ))













         const usuario = async(interdata) => {

             const info = await infoAdmin(usuario_id);
             return info.getCondominios;
         }
         async function getCondominios(usuario_id) { //Función asincrona para consumir datos de la API

            const client = new ApolloClient({ // Cliente de Apolo
                uri: `http://localhost:9900/graphql`,
                cache: new InMemoryCache()
            });
    
            const {data} = await client.query({ // Query de graphql
                query: gql`
                                query{
                                    getCondominios(usuario_id: ${usuario_id}){
                                      usuario_id
                                      condominio_id
                                      nombre
                                      eliminado
                                    }
                                  }
                                `,
            });
        
            console.log('////////////////////////')
            console.log('data:', data)
    
            return data;
    
        };
    
        async function getEdificios(condominio_id) { //Función asincrona para consumir datos de la API
    
            const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });
    
        const {data} = await client.query({ // Query de graphql
            query: gql`
                            query{
                                getEdificios(condominio_id: ${condominio_id}){
                                    edificio_id
                                    condominio_id
                                    nombre
                                    eliminado
                                    num_pisos
                                }
                              }
                            `,
        });
        
        console.log('////////////////////////')
        console.log('data:', data)
    
        return data;
    
        };
        async function getApartamentos(edificio_id) { //Función asincrona para consumir datos de la API
    
            const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });
    
        const {data} = await client.query({ // Query de graphql
            query: gql`
                            query{
                                getApartamentos(edificio_id: ${edificio_id}){
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
    
        async function deleteCondominio(condominio_id) { //Función asincrona para consumir datos de la API
    
            const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });
    
        const {data} = await client.mutate({ // Query de graphql
            mutation: gql`
                            mutation{
                                deleteCondominio(condominio_id: ${condominio_id}){
                                    eliminado
                                }
                              }
                            `,
        });
        
        console.log('////////////////////////')
        console.log('data:', data)
    
        return data;
    
        };

        async function updateCondominio(id, nombre) { //Función asincrona para consumir datos de la API

            console.log(nombre)
            const client = new ApolloClient({ // Cliente de Apolo
                uri: `http://localhost:9900/graphql`,
                cache: new InMemoryCache()
            });
    
            // try{
            const {data} = await client.mutate({ // Mutation de graphql
                mutation: gql`
                            mutation{
                                updateCondominio(condominio_id: ${id}, nombre: "${nombre}"){
                                    nombre
                                    }
                              }
                            `,
            });
            console.log('////////////////////////')
            console.log('data:', data)
    
            return data;
    
        };

        async function deleteEdificio(edificio_id) { //Función asincrona para consumir datos de la API
    
            const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });
    
        const {data} = await client.mutate({ // Query de graphql
            mutation: gql`
                            mutation{
                                deleteEdificio(edificio_id: ${edificio_id}){
                                    eliminado
                                }
                              }
                            `,
        });
        
        console.log('////////////////////////')
        console.log('data:', data)
    
        return data;
    
        };

        async function updateEdificio(id, nombre, num_pisos) { //Función asincrona para consumir datos de la API

            console.log(nombre)
            const client = new ApolloClient({ // Cliente de Apolo
                uri: `http://localhost:9900/graphql`,
                cache: new InMemoryCache()
            });
    
            // try{
            const {data} = await client.mutate({ // Mutation de graphql
                mutation: gql`
                            mutation{
                                updateEdificio(edificio_id: ${id}, nombre: "${nombre}", num_pisos: ${num_pisos}){
                                    nombre
                                    num_pisos
                                    }
                              }
                            `,
            });
            console.log('////////////////////////')
            console.log('data:', data)
    
            return data;
    
        };

        async function deleteApartamento(apartamento_id) { //Función asincrona para consumir datos de la API
    
            const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9900/graphql`,
            cache: new InMemoryCache()
        });
    
        const {data} = await client.mutate({ // Query de graphql
            mutation: gql`
                            mutation{
                                deleteApartamento(apartamento_id: ${apartamento_id}){
                                    eliminado
                                }
                              }
                            `,
        });
        
        console.log('////////////////////////')
        console.log('data:', data)
    
        return data;
    
        };

        async function updateApartamento(id, nombre, alicuota, dimensiones) { //Función asincrona para consumir datos de la API

            console.log(nombre)
            console.log(alicuota)
            console.log(dimensiones)
            const client = new ApolloClient({ // Cliente de Apolo
                uri: `http://localhost:9900/graphql`,
                cache: new InMemoryCache()
            });
    
            // try{
            const {data} = await client.mutate({ // Mutation de graphql
                mutation: gql`
                            mutation{
                                updateApartamento(apartamento_id: ${id}, nombre: "${nombre}", alicuota: "${alicuota}", dimensiones: "${dimensiones}"){
                                    nombre
                                    alicuota
                                    dimensiones
                                    }
                              }
                            `,
            });
            console.log('////////////////////////')
            console.log('data:', data)
    
            return data;
    
        };




        








        const submitCondominio = async(interdata) =>{
            console.log(interdata)
    
            const edificios = await getEdificios(interdata);
    
            setEdificio(edificios.getEdificios);
            setIdCondominio(interdata);
            setOpenE(true);
        }

        const modificarCondominio = async(id, nombre) =>{
            console.log(id)
            console.log(nombre)
            localStorage.setItem("idCondominio", id);
            localStorage.setItem("nombreCondominio", nombre);
            setOpenModificarCondominio(true);
        }

        const eliminarCondominio = async(interdata) =>{
            console.log(interdata)
            const edificios = await deleteCondominio(interdata);
            console.log(edificios)
        }





        const submitEdificio = async(interdata) =>{
            console.log(interdata)
        
            const apartamentos = await getApartamentos(interdata);
        
            setApartamento(apartamentos.getApartamentos);
            setIdEdificio(interdata);
            setOpenA(true);
        }

        const modificarEdificio = async(id, nombre, num_pisos) =>{
            console.log(id)
            console.log(nombre)
            console.log(num_pisos)
            localStorage.setItem("idEdificio", id);
            localStorage.setItem("nombreEdificio", nombre);
            localStorage.setItem("num_pisos", num_pisos)
            setOpenModificarEdificio(true);
        }

        const eliminarEdificio = async(interdata) =>{
            console.log(interdata)
            const apartamentos = await deleteEdificio(interdata);
            console.log(apartamentos)
        }





        const modificarApartamento = async(id, nombre, alicuota, dimensiones, is_alquilado) =>{
            localStorage.setItem("idApartamento", id);
            localStorage.setItem("nombreApartamento", nombre);
            localStorage.setItem("alicuota", alicuota);
            localStorage.setItem("dimensiones", dimensiones);
            localStorage.setItem("is_alquilado", is_alquilado)
            setOpenModificarApartamento(true);
        }

        const eliminarApartamento = async(interdata) =>{
            console.log(interdata)
            const apartamento = await deleteApartamento(interdata);
            console.log(apartamento)
        }










        const handleClose = () => {
            setOpenE(false);
            setOpenA(false);
            setOpenModificarCondominio(false);
            setOpenModificarEdificio(false);
            setOpenModificarApartamento(false)
        };
        
        const classes = useStyles();
        const [openE, setOpenE] = React.useState(false);
        const [openA, setOpenA] = React.useState(false);
        const [openModificarCondominio, setOpenModificarCondominio] = React.useState(false);
        const [openModificarEdificio, setOpenModificarEdificio] = React.useState(false);
        const [openModificarApartamento, setOpenModificarApartamento] = React.useState(false);










        const {register, handleSubmit, errors} = useForm({
            reValidateMode:'onSubmit'
        });
    
        const onSubmit = async() =>{
    
            const info = await updateCondominio(localStorage.getItem("idCondominio"), dato.nombreCondominio);
    
            localStorage.setItem('nombreCondominio', info.updateCondominio.nombre);
    
        }

        const onSubmitE = async() =>{
    
            const info = await updateEdificio(localStorage.getItem("idEdificio"), dato.nombreEdificio, dato.pisos);
            
            console.log(info)

            localStorage.setItem('nombreEdificio', info.updateEdificio.nombre);
            localStorage.setItem('num_pisos', info.updateEdificio.pisos);
    
        }

        const onSubmitA = async() =>{
    
            const info = await updateApartamento(localStorage.getItem("idApartamento"), dato.nombreApartamento, dato.aliquot, dato.dimensions);
    
            localStorage.setItem('nombreApartamento', info.updateApartamento.nombre);
            localStorage.setItem('alicuota', info.updateApartamento.aliquot);
            localStorage.setItem('dimensiones', info.updateApartamento.dimensions);
    
        }

        const handleChange = e =>{
            setData({
                ...dato,
                [e.target.name] : e.target.value
            })
  
        }










             return (

        <div className={styles.datos}>
            <div className={styles.orden}>
                
                <NavbarAdmin/>
            </div>
        <div className={styles.datos}>
            <Table striped bordered hover>
                <thead>
                <tr className={styles.border}>
                    <th className={styles.border}>Condominio ID</th>
                    <th className={styles.border}>Nombre</th>
                </tr>
                </thead>
                {info && condominios(info)}
            </Table>
            <div className={styles.inicio}>

            <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openE}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
            >
                <Fade in={openE}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Edificios del Condominio #{idCondominio}</h2>

                        <Table striped bordered hover >

                            <thead>
                                <tr className={styles.border}>
                                    <th className={styles.border}>Edificio ID</th>
                                    <th className={styles.border}>Nombre</th>
                                    <th className={styles.border}>Número de pisos</th>
                                </tr>
                            </thead>
                            {edificio && edificios(edificio)}
                        </Table>
                    </div>
                </Fade>
            </Modal>
        </div>
        <div className={styles.inicio}>

            <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openModificarCondominio}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
            >
                <Fade in={openModificarCondominio}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Modificar Condominio</h2>

                        <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={`${classes.root} ${styles.form}`}
                    >
                        <div>

                            <TextField
                                label="Nombre:"
                                className={"col s12"}
                                name="nombreCondominio"
                                defaultValue={localStorage.getItem("nombreCondominio")}
                                inputRef={register({
                                    required: {value: true, message: "Nombre obligatorio"}
                                })}
                                onChange={handleChange}
                            />
                            <div style={{display:"block", color:"red", visibility:errors?.nombre ? "visible" : "hidden"}}>{`${errors?.nombre && errors?.nombre?.message} `}</div>
                        </div>

                        <div className={styles.inicio}>
                            <button
                                className={styles.boton}
                            >
                                Actualizar
                            </button>
                        </div>

                    </form>
                    </div>
                </Fade>
            </Modal>
        </div>

        <div className={styles.inicio}>

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
                <Fade in={openA}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Apartamentos del Edificio #{idEdificio}</h2>

                        <Table striped bordered hover >
                            <thead>
                                <tr className={styles.border}>
                                <th className={styles.border}>Apartamento ID</th>
                                <th className={styles.border}>Nombre</th>
                                <th className={styles.border}>Alícuota</th>
                                <th className={styles.border}>Dimensiones</th>
                                <th className={styles.border}>Alquilado</th>
                                </tr>
                            </thead>
                            {apartamento && apartamentos(apartamento)}
                        </Table>
                    </div>
                </Fade>
            </Modal>
        </div>
        
        <div className={styles.inicio}>

            <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openModificarEdificio}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
            >
                <Fade in={openModificarEdificio}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Modificar Edificio</h2>

                        <form
                        onSubmit={handleSubmit(onSubmitE)}
                        className={`${classes.root} ${styles.form}`}
                    >
                        <div>

                            <TextField
                                label="Nombre:"
                                className={"col s12"}
                                name="nombreEdificio"
                                defaultValue={localStorage.getItem("nombreEdificio")}
                                inputRef={register({
                                    required: {value: true, message: "Nombre obligatorio"}
                                })}
                                onChange={handleChange}
                            />
                            <div style={{display:"block", color:"red", visibility:errors?.nombre ? "visible" : "hidden"}}>{`${errors?.nombre && errors?.nombre?.message} `}</div>
                        </div>

                        <div>

                            <TextField
                                label="Número de pisos:"
                                className={"col s12"}
                                name="pisos"
                                defaultValue={localStorage.getItem("num_pisos")}
                                inputRef={register({
                                    required: {value: true, message: "Numero obligatorio"}
                                })}
                                onChange={handleChange}
                            />
                            <div style={{display:"block", color:"red", visibility:errors?.nombre ? "visible" : "hidden"}}>{`${errors?.nombre && errors?.nombre?.message} `}</div>
                        </div>

                        <div className={styles.inicio}>
                            <button
                                className={styles.boton}
                            >
                                Actualizar
                            </button>
                        </div>

                    </form>
                    </div>
                </Fade>
            </Modal>
        </div>


        <div className={styles.inicio}>

            <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openModificarApartamento}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
            >
                <Fade in={openModificarApartamento}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Modificar Apartamento</h2>

                        <form
                        onSubmit={handleSubmit(onSubmitA)}
                        className={`${classes.root} ${styles.form}`}
                    >
                        <div>

                            <TextField
                                label="Nombre:"
                                className={"col s12"}
                                name="nombreApartamento"
                                defaultValue={localStorage.getItem("nombreApartamento")}
                                inputRef={register({
                                    required: {value: true, message: "Nombre obligatorio"}
                                })}
                                onChange={handleChange}
                            />
                            <div style={{display:"block", color:"red", visibility:errors?.nombre ? "visible" : "hidden"}}>{`${errors?.nombre && errors?.nombre?.message} `}</div>
                        </div>

                        <div>

                            <TextField
                                label="Alícuota:"
                                className={"col s12"}
                                name="aliquot"
                                defaultValue={localStorage.getItem("alicuota")}
                                inputRef={register({
                                    required: {value: true, message: "Nombre obligatorio"}
                                })}
                                onChange={handleChange}
                            />
                            <div style={{display:"block", color:"red", visibility:errors?.nombre ? "visible" : "hidden"}}>{`${errors?.nombre && errors?.nombre?.message} `}</div>
                        </div>

                        <div>

                            <TextField
                                label="Dimensiones:"
                                className={"col s12"}
                                name="dimensions"
                                defaultValue={localStorage.getItem("dimensiones")}
                                inputRef={register({
                                    required: {value: true, message: "Nombre obligatorio"}
                                })}
                                onChange={handleChange}
                            />
                            <div style={{display:"block", color:"red", visibility:errors?.nombre ? "visible" : "hidden"}}>{`${errors?.nombre && errors?.nombre?.message} `}</div>
                        </div>

                        <div className={styles.inicio}>
                            <button
                                className={styles.boton}
                            >
                                Actualizar
                            </button>
                        </div>

                    </form>
                    </div>
                </Fade>
            </Modal>
        </div>

        </div>
        </div> 

        );
     }
    export default CollapsibleTable