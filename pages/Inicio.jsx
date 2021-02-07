import Navbar from '../components/navbar';
import Image from 'next/image'
import styles from '../styles/landingPage.module.css'

const Inicio=()=>{

    return(
        <>
            <div className={styles.orden}>
                <Image className={styles.fondo}
                       src = "/fondo.jpg"
                       alt ="imagen"
                       layout= "fill"
                />
                <Navbar/>

            </div>


            {/*<p>Comodidad para tu hogar</p>*/}

        </>
    )

}


export default Inicio