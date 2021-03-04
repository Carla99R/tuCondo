import TablaCondominios from '../components/tablaCondominios';
import Image from 'next/image'
import styles from '../styles/adminCondominios.module.css'
import React, {useContext} from "react";
import clientContext from "../context/client/clientContext";

const AdminCondominio=()=>{

    const { nombre } = useContext(clientContext);
    console.log(nombre);
    return(
        <>
            <div className={styles.orden}>
                <figure className={styles.logo}>
                    <Image src="/DonBarriga.png" alt="logo" className={styles.imagen}
                           width={120}
                           height={120}
                    />
                </figure>
                <TablaCondominios/>
            </div>


            {/*<p>Comodidad para tu hogar</p>*/}

        </>
    )

}


export default AdminCondominio
