import TablaCondominios from '../components/tablaCondominios';
import Image from 'next/image'
import styles from '../styles/adminCondominios.module.css'
import React from "react";

const AdminCondominio=()=>{

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
