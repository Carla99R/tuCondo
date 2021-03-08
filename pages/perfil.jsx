import React, { useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";
import styles from '../styles/adminCondominios.module.css'
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {useForm} from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";
import NavbarInicio from "../components/navbarInicio";
import Image from "next/image";
import {Spinner} from "react-bootstrap";

const Perfil =()=> {

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

    const {register, handleSubmit, errors} = useForm({
        reValidateMode:'onSubmit'
    });

    const onSubmit = async() =>{

        const info = await updateUsuario(dato.nombre, dato.apellido, dato.correo);


        console.log(info.updateUsuario.nombre)
        console.log(info.updateUsuario)

        localStorage.setItem('nombre', info.updateUsuario.nombre);
        localStorage.setItem('apellido', info.updateUsuario.apellido);
        localStorage.setItem('correo', info.updateUsuario.correo);
        localStorage.setItem('cedula', info.updateUsuario.cedula);

        setLoading(false);

    }

    const inicial = async() =>{

        const info = await getInitialProps(dato.usuario_id);

        console.log(info.getApartamento.nombre)
        console.log(info.getApartamento)

        localStorage.setItem('nombreA', info.getApartamento.nombre);
        localStorage.setItem('alicuota', info.getApartamento.alicuota);
        localStorage.setItem('dimensiones', info.getApartamento.dimensiones);

        if(info.getApartamento.is_alquilado === true){
            localStorage.setItem('is_alquilado', "Sí");
        }else{
            localStorage.setItem('is_alquilado', "No");
        }


        setLoading(false);

    }

      const handleChange = e =>{
          setData({
              ...dato,
              [e.target.name] : e.target.value
          })

      }

    async function updateUsuario(nombre, apellido, correo) { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9700/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.mutate({ // Mutation de graphql
            mutation: gql`
                        mutation{
                            updateUsuario(usuario_id: ${localStorage.getItem("usuario_id")}, nombre: "${nombre}", apellido: "${apellido}", correo: "${correo}"){
                                nombre
                                apellido
                                correo
                                usuario_id
                                cedula
                                }
                          }
                        `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    async function getInitialProps() { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9700/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Query de graphql
            query: gql`
                        query{
                            getApartamento(usuario_id: ${usuario_id}){
                                nombre
                                alicuota
                                is_alquilado
                                dimensiones
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

                <div className={styles.datos}>
                    <label className={styles.labelI}
                    content={inicial()}
                    >
                        <label className={styles.labelN}>
                            Apartamento {localStorage.getItem("nombreA")}
                        </label>

                        <label className={styles.label}>
                           <p>-----------------------------------------------------</p>
                            <p className={styles.a}>Alicuota: {localStorage.getItem("alicuota")}</p>
                        </label>

                        <label className={styles.label}>
                            <p>-----------------------------------------------------</p>
                            <p className={styles.a}>Dimensiones: {localStorage.getItem("dimensiones")}</p>
                        </label>

                        <label className={styles.label}>
                            <p>-----------------------------------------------------</p>
                            <p className={styles.a}>Alquilado: {localStorage.getItem("is_alquilado")}</p>
                        </label>


                    </label>

                </div>

                <div className={styles.paper}>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={`${classes.root} ${styles.form}`}
                    >
                        <div>

                            <TextField
                                label="Nombre:"
                                className={"col s12"}
                                name="nombre"
                                defaultValue={nombre}
                                inputRef={register({
                                    required: {value: true, message: "Nombre obligatorio"}
                                })}
                                onChange={handleChange}
                            />
                            <div style={{display:"block", color:"red", visibility:errors?.nombre ? "visible" : "hidden"}}>{`${errors?.nombre && errors?.nombre?.message} `}</div>
                        </div>

                        <div>
                            <TextField label="Apellido:"
                                       className={"col s12"}
                                       name={"apellido"}
                                       defaultValue={apellido}
                                       inputRef={register({
                                           required: {value: true, message: "Apellido obligatorio"}
                                       })}
                                       onChange={handleChange}
                            />
                            <div style={{display:"block", color:"red", visibility:errors?.apellido ? "visible" : "hidden"}}>{`${errors?.apellido && errors?.apellido?.message} `}</div>

                        </div>

                        <div>
                            <TextField label="Correo:"
                                       className={"col s12"}
                                       name={"correo"}
                                       defaultValue={correo}
                                       inputRef={register({
                                           required: {value: true, message: "Correo obligatorio"}
                                       })}
                                       onChange={handleChange}
                            />
                            <div style={{display:"block", color:"red", visibility:errors?.correo ? "visible" : "hidden"}}>{`${errors?.correo && errors?.correo?.message} `}</div>

                        </div>

                        <div>
                            <TextField label="Cédula:"
                                       className={"col s12"}
                                       name={"cedula"}
                                       defaultValue={cedula}
                                       inputRef={register({
                                           required: {value: true, message: "Cédula obligatorio"}
                                       })}
                                       onChange={handleChange}
                            />
                            <div style={{display:"block", color:"red", visibility:errors?.cedula ? "visible" : "hidden"}}>{`${errors?.cedula && errors?.cedula?.message} `}</div>

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
            </div>


        </div>

    )

}

export default Perfil;

