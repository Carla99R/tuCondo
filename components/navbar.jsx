import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, NavLink, Nav } from 'react-bootstrap'
import styles from '../styles/navbar.module.css';


const NavBar =() =>{
    return <>
        <div className={styles.navbarEspecial}>
            <Navbar >
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <NavLink href="#home">Home</NavLink>
                    <NavLink href="#features">Features</NavLink>
                    <NavLink href="#pricing">Pricing</NavLink>
                </Nav>
            </Navbar>
        </div>

    </>
}

export default NavBar


