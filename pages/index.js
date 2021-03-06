import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from "../styles/landingPage.module.css";
import Image from "next/image";
import Navbar from "../components/navbar";
import ClientState from "../context/client/clientState";

const HomePage =()=> {

    useEffect(()=>{
        localStorage.clear();

    },[]);

    return (
        <ClientState>
            <div className={styles.orden}>
                <Image className={styles.fondo}
                       src="/fondo.jpg"
                       alt="imagen"
                       layout="fill"
                />
                <Navbar/>
            </div>
        </ClientState>
    )

}


export default HomePage;


