import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from "../styles/landingPage.module.css";
import {TextField} from "@material-ui/core";
import classnames from "classnames";

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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                        <form id="transition-modal-description" className={`${classes.root}, ${styles.form}`} noValidate autoComplete="off" >
                            <div>
                                <TextField  className="col s12" id="standard-required" label="Correo:" />
                            </div>
                            <div>
                                <TextField className="col s12" id="standard-password-input" type="password" label="Constraseña:"/>
                            </div>
                            <div className={styles.inicio}>
                                <button type={"submit"} className={styles.boton}>
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