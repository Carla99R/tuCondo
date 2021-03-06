import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav } from 'react-bootstrap'
import Link from 'next/link'
import styles from '../styles/landingPage.module.css'
import Image from 'next/image'
import classnames from "classnames";
import TransitionsModal from "./modal";

const NavBar =() =>{

    return <>
            <Navbar className={styles.items}>
                <Navbar.Brand href="Inicio" className={styles.brand}>
                    <figure className={styles.logo}>
                        <Image src="/logotipo.png" alt="logo" className={styles.imagen}
                               width={120}
                               height={120}
                        />
                    </figure>
                </Navbar.Brand>
                <Nav className={classnames(`mr-auto, ${styles.links}`)}>
                    <Link href="/" scroll={true}>
                        <a id={styles.inicio}>Inicio</a>
                    </Link>
                    <Link href="/adminCondominio" scroll={true}>
                        <a id={styles.nosotros}>Nosotros</a>
                    </Link>
                    <Link href="/Informacion" scroll={true}>
                        <a id={styles.info}>Informacion</a>
                    </Link>
                    <TransitionsModal/>

                </Nav>
            </Navbar>

    </>
}

export default NavBar


