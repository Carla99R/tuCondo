import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from "../styles/landingPage.module.css";
import { useForm } from "react-hook-form";
import MaskInput from "./MaskInput";

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

export default function TransitionsModal() {


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let processData = false;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {register, handleSubmit, errors} = useForm({
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
        console.log(...data)
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
                                      className={`${classes.root}, ${styles.form}`}>
                                    <div className="input-field col s12">
                                        <MaskInput
                                            name={"correo"}
                                            type={"text"}
                                            id={"correo"}
                                            onChange={handleChange}
                                            ref={register({
                                                required: {value: true, message: "Correo obligatorio"}
                                            })}
                                        />
                                        <label htmlFor="correo">Correo</label>
                                        <span className="helper-text invalid" data-error="wrong">
                                        {errors?.correo && errors?.correo.message}
                                    </span>

                                    </div>
                                    <div className="input-field col s12" id="standard-password-input">
                                        <MaskInput
                                            name={"password"}
                                            type={"password"}
                                            id={"password"}
                                            onChange={handleChange}
                                            ref={register({
                                                required: {value: true, message: "Contraseña obligatoria"}
                                            })}
                                        />
                                        <label htmlFor="password">Contraseña</label>
                                        <span className="helper-text invalid" data-error="wrong">
                                        {errors?.password && errors?.password.message}
                                    </span>

                                    </div>

                                    <div className={styles.inicio}>
                                        <button className={styles.boton}>
                                            Iniciar sesión
                                        </button>

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