import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, NavLink, Nav } from 'react-bootstrap'
import styles from '../styles/landingPage.module.css'
import Image from 'next/image'


const NavBar =() =>{
    return <>
            <Navbar className={styles.items}>
                <Navbar.Brand href="#inicio" className={styles.brand}>
                    <figure className={styles.logo}>
                        <Image src="/logotipo.png" alt="logo" className={styles.imagen}
                               width={90}
                               height={90}
                        />
                    </figure>
                </Navbar.Brand>
                <Nav className="mr-auto" className={styles.links}>
                    <NavLink href="#Inicio" id={styles.inicio}>Inicio</NavLink>
                    <NavLink href="#nosotros" id={styles.nosotros}>Nosotros</NavLink>
                    <NavLink href="#informacion" id={styles.info}>Información</NavLink>
                </Nav>
            </Navbar>


    </>
}

export default NavBar


