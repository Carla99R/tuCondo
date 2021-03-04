import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from "../styles/landingPage.module.css";
import { useForm } from "react-hook-form";
import MaskInput from "./MaskInput";
import {TextField} from "@material-ui/core";
import Link from "next/link";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import AdminCondominio from "../pages/adminCondominio";
import { useRouter } from "next/router";
import ClientContext from "../context/client/clientContext";


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
        width: 500
    },
}));


export default function TransitionsModal()  {

    const classes = useStyles();
    const router = useRouter();
    const { setUser } = useContext(ClientContext);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {register, handleSubmit, errors} = useForm({
        reValidateMode:'onSubmit'
    });


    const [dato, setData] = useState({
        correo:"",
        password:""
    })

    const onSubmit = async(interdata) =>{

        const datos = {
            correo: interdata.correo,
            password: interdata.password

        }
        const info = await validUsuario(datos.correo, datos.password);

        console.log(info.getUsuarioLogin.nombre)
        console.log(info)
        setUser(info.getUsuarioLogin);

        console.log(setUser)


        if(info.getUsuarioLogin.is_admin === true){
            router.push('/adminCondominio');
        }
        else{
            //TODO ACÁ IRÍA LA PRIMERA PAGE DE UN USUARIO NORMAL
            //router.push('/inicio');
        }


        console.log(datos.correo);
        console.log(datos.password);
    }

    const handleChange = e =>{
        setData({
            ...dato,
            [e.target.name] : e.target.value
        })
        console.log(dato.correo);
        console.log(dato.password);

    }

     async function validUsuario(correo, psw) { //Función asincrona para consumir datos de la API

         const client = new ApolloClient({ // Cliente de Apolo
             uri: `http://localhost:9300/graphql`,
             cache: new InMemoryCache()
         });

        // async function getStaticsPropss(correo, psw, res) {

             // try{
                 const {data} = await client.query({ // Query de graphql
                     query: gql`
                        query{
                            getUsuarioLogin(correo: "${correo}", psw: "${psw}"){
                              usuario_id
                              nombre
                              apellido
                              cedula
                              correo
                              is_admin
                            }
                          }
                        `,
                 });
                 console.log('////////////////////////')
                 console.log('data:', data)


         //res.statusCode(200).json({usuario: data.getUsuarioLogin, error: null });
                 //console.log(res);

                 return data;
                 //return data.getUsuarioLogin;
             // }
             // catch (error){
             //     if(error.message === "404 Not Found"){
             //         res.statusCode(400).json({usuario: null, error: "Usuario no encontrado"})
             //     }
             //     // else{
             //     //     res.statusCode(500).json({usuario: null, error:"Error interno, por favor vuelva a intentarlo"})
             //     // }
             // }

             };



    return (
        <div>
            <AccountCircle className={styles.login} fontSize={"large"} onClick={handleOpen}/>
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
                        <h2 id="transition-modal-title">Inicio de sesión</h2>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            id="transition-modal-description"
                            className={`${classes.root} ${styles.form}`}
                        >
                            <div>
                                <TextField
                                    label="Correo:"
                                    className={"col s12"}
                                    name="correo"
                                    inputRef={register({
                                        required: {value: true, message: "Correo obligatorio"}
                                    })}
                                    onChange={handleChange}
                                />
                                <div style={{display:"block", color:"red", visibility:errors?.correo ? "visible" : "hidden"}}>{`${errors?.correo && errors?.correo?.message} `}</div>
                            </div>

                            <div>
                                <TextField label="Contraseña:" className={"col s12"} id="standard-password-input" type="password"
                                           name={"password"}
                                           inputRef={register({
                                               required: {value: true, message: "Contraseña obligatoria"}
                                           })}
                                           onChange={handleChange}
                                />
                                <div style={{display:"block", color:"red", visibility:errors?.password ? "visible" : "hidden"}}>{`${errors?.password && errors?.password?.message} `}</div>

                            </div>

                            <div className={styles.inicio}>
                                <button
                                    className={styles.boton}
                                    type="submit"
                                >
                                    Iniciar sesión
                                </button>
                            </div>

                        </form>

                    </div>
                </Fade>
            </Modal>
        </div>

    );
}




