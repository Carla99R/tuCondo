import React, {useState} from 'react';
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
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


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
        width: 500,
        height: 230,
    },
}));


 export default function TransitionsModal({usuario}) {

    console.log("usuario", usuario)

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let processData = false;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {register, handleSubmit} = useForm({
        reValidateMode:'onSubmit'
    });


    const [data, setData] = useState({
        correo:"",
        password:""
    })

    const onSubmit = interdata=>{

        const datos = {
            correo: interdata.correo,
            password: interdata.password

        }

        //TODO acá tengo que guardar la data en el clientState

        processData = true;

        console.log(datos.correo);
        console.log(datos.password);
    }

    const handleChange = e =>{
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
        console.log(data.password)
        console.log(data.correo)

    }


    return (

        <>
            {processData === true ? <adminCondominio/> :

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


                                <form onSubmit={handleSubmit(onSubmit)} id="transition-modal-description"
                                      className={`${classes.root} ${styles.form}`}>
                                    <div>
                                        <TextField label="Correo:" className={"col s12"}
                                                   name={"correo"}
                                                    ref={register({
                                                        required: {value: true, message: "Correo obligatorio"}
                                                    })}
                                                   onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <TextField label="Contraseña:" className={"col s12"} id="standard-password-input" type="password"
                                                   name={"password"}
                                                   ref={register({
                                                       required: {value: true, message: "Contraseña obligatoria"}
                                                   })}
                                                   onChange={handleChange}
                                        />

                                    </div>

                                    <div className={styles.inicio}>
                                        <Link href="/adminCondominio">
                                            <button className={styles.boton}>
                                                Iniciar sesión
                                            </button>
                                        </Link>
                                    </div>

                                </form>

                            </div>
                        </Fade>
                    </Modal>
                </div>

            }
        </>

    );
}

export async function getStaticsProps(){

    const client =  new ApolloClient({ // Cliente de Apolo
        uri: `http://localhost:9100/graphql`,
        cache: new InMemoryCache()
    })

    const { data } = await client.query({ // Query de graphql
        query: gql`
        query{
            getUsuario(correo: correo){
              usuario_id
              nombre
              apellido
              cedula
              correo
            }
          }
        `
    })
    console.log('////////////////////////')
    console.log('data:', data)

    return { // Retornar la data que trae el query
        props: {
            usuario: data.usuario // Cambiar corchetes por la data cuando funcione
        }
    }
}

