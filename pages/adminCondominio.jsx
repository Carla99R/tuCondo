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
                <CollapsibleTable/>
            </div>
        </ClientState>
    )

}


export default AdminCondominio
