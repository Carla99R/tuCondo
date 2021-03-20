import Link from 'next/link'
import styles from '../styles/landingPage.module.css'
import Image from 'next/image'
import classnames from "classnames";
import {Nav, Navbar} from "react-bootstrap";

const NavBarAdmin =() =>{

    return <>
        <Navbar className={styles.items}>
            <Navbar.Brand href="Inicio" className={styles.brand}>
                <figure className={styles.logo}>
                    <Image src="/logotipo.png" alt="logo" className={styles.imagen}
                           width={110}
                           height={110}
                    />
                </figure>
            </Navbar.Brand>
            <Nav className={classnames(`mr-auto, ${styles.links}`)}>
                <Link href="/adminCondominio" scroll={true}>
                    <a id={styles.inicio}>Inicio</a>
                </Link>
                <Link href="/adminFactura" scroll={true}>
                    <a id={styles.inicio}>Facturas</a>
                </Link>
                <Link href="/perfilAdmin" scroll={true}>
                    <a id={styles.nosotros}>Perfil</a>
                </Link>
            </Nav>
        </Navbar>

    </>
}

export default NavBarAdmin;
