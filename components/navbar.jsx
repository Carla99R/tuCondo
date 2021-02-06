import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav } from 'react-bootstrap'
import Link from 'next/link'
import styles from '../styles/landingPage.module.css'
import Image from 'next/image'
import AccountCircle from '@material-ui/icons/AccountCircle';
import classnames from "classnames";

const NavBar =() =>{
    return <>
            <Navbar className={styles.items}>
                <Navbar.Brand href="Inicio" className={styles.brand}>
                    <figure className={styles.logo}>
                        <Image src="/logotipo.png" alt="logo" className={styles.imagen}
                               width={90}
                               height={90}
                        />
                    </figure>
                </Navbar.Brand>
                <Nav className={classnames(`mr-auto, ${styles.links}`)}>
                    <Link href="/" scroll={true}>
                        <a id={styles.inicio}>Inicio</a>
                    </Link>
                    <Link href="/Nosotros" scroll={true}>
                        <a id={styles.nosotros}>Nosotros</a>
                    </Link>
                    <Link href="/Informacion" scroll={true}>
                        <a id={styles.info}>Informacion</a>
                    </Link>
                    <AccountCircle className={styles.login} fontSize={"large"}/>

                </Nav>
            </Navbar>

    </>
}

export default NavBar


