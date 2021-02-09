import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from "../styles/landingPage.module.css";
import Image from "next/image";
import Navbar from "../components/navbar";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'; //npm install @apollo/client graphql

const HomePage =({ Component, pageProps })=> {
    console.log(pageProps)
    return(
        <>
            <div className={styles.orden}>
                <Image className={styles.fondo}
                       src = "/fondo.jpg"
                       alt ="imagen"
                       layout= "fill"
                />
                <Navbar>
                    <Component {...pageProps} />
                </Navbar>

            </div>


            {/*<p>Comodidad para tu hogar</p>*/}

        </>
    )
}

// Video de donde saque esto https://youtu.be/oxUPXhZ1t9I
export async function getStaticsProps() { //Función asincrona para consumir datos de la API

    const client =  new ApolloClient({ // Cliente de Apolo
        uri: `http://localhost:9000/graphql`,
        cache: new InMemoryCache()
    })

    const { data } = await client.query({ // Query de graphql
        query: gql`
        query{
            getUsuarios{
              usuario_id
              nombre
              apellido
              cedula
              correo
            }
          }
        `
    })
    console.log('////////////////////////')
    console.log('data:', data)

    return { // Retornar la data que trae el query
        pageProps: {
            usuarios: [] // Cambiar corchetes por la data cuando funcione
        }
    }
}

export default HomePage;


