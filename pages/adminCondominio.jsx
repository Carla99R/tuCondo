import CollapsibleTable from '../components/tablaCondominios';
import Image from 'next/image'
import styles from '../styles/adminCondominios.module.css'
import React, {useEffect, useState} from "react";
import ClientState from "../context/client/clientState";


const AdminCondominio=()=>{

    const [ name, setName ] = useState('');

    useEffect(()=>{
        setName(localStorage.getItem('nombre'));

    },[]);

    return(
        <ClientState>
            <div className={styles.orden}>
                <figure className={styles.logo}>
                    <Image src="/DonBarriga.png" alt="logo" className={styles.imagen}
                           width={120}
                           height={120}
                    />
                </figure>
                <div>{name}</div>
                <CollapsibleTable/>
            </div>
        </ClientState>
    )

}


export default AdminCondominio
