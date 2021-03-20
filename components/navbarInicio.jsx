import Link from 'next/link'
import styles from '../styles/landingPage.module.css'
import Image from 'next/image'
import classnames from "classnames";
import {Nav, Navbar} from "react-bootstrap";

const NavBarInicio =() =>{

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
                <Link href="/inicio" scroll={true}>
                    <a id={styles.inicio}>Inicio</a>
                </Link>
                <Link href="/perfil" scroll={true}>
                    <a id={styles.nosotros}>Perfil</a>
                </Link>
                {/*<Link href="/noticias" scroll={true}>*/}
                {/*    <a id={styles.info}>Noticias</a>*/}
                {/*</Link>*/}
                <Link href="/pagos" scroll={true}>
                    <a id={styles.info}>Facturas</a>
                </Link>
                <Link href="/solicitudes" scroll={true}>
                    <a id={styles.info}>Solicitudes</a>
                </Link>
                <Link href="/p" scroll={true}>
                    <a id={styles.info}>Pagos Realizados</a>
                </Link>
            </Nav>
        </Navbar>

    </>
}

export default NavBarInicio;
