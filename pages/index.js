import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from "../styles/landingPage.module.css";
import Image from "next/image";
import Navbar from "../components/navbar";

const HomePage =()=> {

    return(
        <>
            <div className={styles.orden}>
                <Image className={styles.fondo}
                       src = "/fondo.jpg"
                       alt ="imagen"
                       layout= "fill"
                />
                <Navbar/>
            </div>

        </>
    )
}

export default HomePage;


