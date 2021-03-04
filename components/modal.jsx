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
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";



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


 const TransitionsModal =({pageProps }) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let processData = false;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {register, handleSubmit, error} = useForm({
        reValidateMode:'onSubmit'
    });


    const [dato, setData] = useState({
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

        console.log(processData);

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
                                            {getStaticsProps}

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

     async function getStaticsProps() { //Función asincrona para consumir datos de la API

         const client = new ApolloClient({ // Cliente de Apolo
             uri: `http://localhost:9200/graphql`,
             cache: new InMemoryCache()
         })

         const args = {
             correo: dato.correo,
             psw: dato.password
         }

         const {data} = await client.query({ // Query de graphql
             query: gql`
        query{
            getUsuarioLogin(correo: args.correo, psw: args.psw){
              usuario_id
              nombre
              apellido
              cedula
              correo
              is_admin
            }
          }
        `
         })
         console.log('////////////////////////')
         console.log('data:', data)

         return { // Retornar la data que trae el query
             pageProps: {
                 usuario: data.getUsuario() // Cambiar corchetes por la data cuando funcione
             }
         }
     }

}




export default TransitionsModal



