import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from "../styles/landingPage.module.css";
import Image from "next/image";
import NavbarInicio from "../components/navbarInicio";
import ClientState from "../context/client/clientState";

const Inicio =()=> {

    return (
        <ClientState>
            <div className={styles.orden}>
                <Image className={styles.fondo}
                       src="/fondoInicio.jpg"
                       alt="imagen"
                       layout="fill"
                />
                <NavbarInicio/>
            </div>
        </ClientState>
    )

}

export default Inicio;